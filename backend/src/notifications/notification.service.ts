import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import axios from 'axios';
import moment from 'moment';
import { Firestore } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NotificationService implements OnModuleInit {
    private readonly logger = new Logger(NotificationService.name);
    private firestore: Firestore;
    private expoPushToken: string; // Expo push token
    private userId: string;

    constructor(private readonly userService: UserService) {
        this.firestore = admin.firestore();
    }

    // Set Expo Push Token dynamically
    setExpoPushToken(token: string) {
        this.expoPushToken = token;
        this.logger.log(`Expo Push Token set: ${token}`);
    }

    setUserId(userId: string) {
        this.userId = userId;
        this.logger.log(`UserId set: ${userId}`);
    }

    // Send push notification
    async sendPushNotification(eventTitle: string, time: string) {
        if (!this.expoPushToken) {
            this.logger.error('Expo Push Token is not set.');
            return;
        }

        try {
            await axios.post('https://exp.host/--/api/v2/push/send', {
                to: this.expoPushToken,
                title: `Upcoming Event: ${eventTitle}`,
                body: `Your event starts at ${time}.`,
            });
            this.logger.log(`Notification sent for event: ${eventTitle}`);
        } catch (error) {
            this.logger.error('Error sending notification', error);
        }
    }

    // Check and send notifications for events
    async checkAndSendNotifications(userId: string) {
        const currentDate = moment().format('YYYY-MM-DD'); // Get current date
        const currentTime = moment(); // Current time

        try {
            // Fetch the user's schedule
            const userDoc = await this.firestore.collection('users').doc(userId).get();

            if (!userDoc.exists) {
                this.logger.warn(`User with ID ${userId} does not exist.`);
                return;
            }

            const userData = userDoc.data();
            const schedule = userData?.schedule;
            if (!schedule) {
                this.logger.warn(`No schedule found for user ${userId}`);
                return;
            }

            // Get today's schedule
            const todaySchedule = schedule[currentDate];
            if (!todaySchedule) {
                this.logger.warn(`No schedule for user ${userId} on ${currentDate}`);
                return;
            }

            // Process events
            const { classes = [], exams = [], tasks = [] } = todaySchedule;
            const events = [...classes, ...exams, ...tasks];

            for (const event of events) {
                const eventStartTime = moment(event.startingTime, 'HH:mm'); // Event's starting time
                const notificationOffsets = event.notificationOffsets || [60]; // Default to 1 hour before
                for (const offset of notificationOffsets) {
                    const diffInMinutes = eventStartTime.diff(currentTime, 'minutes');
                    if (diffInMinutes === offset) {
                        await this.sendPushNotification(event.subjectName, event.startingTime);
                    }
                }
            }
        } catch (error) {
            this.logger.error(`Error fetching or processing events for user ${userId}`, error.message);
        }
    }

    async checkNextHourForEvents(userId: string) {
        if (!userId) {
            this.logger.warn('UserId is not set. Skipping next-hour check.');
            return;
        }

        const currentDate = moment().format('YYYY-MM-DD');
        const currentTime = moment();
        const nextHourStart = currentTime.clone().add(1, 'hour').startOf('hour');
        const nextHourEnd = nextHourStart.clone().add(1, 'hour');

        try {
            const userDoc = await this.firestore.collection('users').doc(userId).get();
            if (!userDoc.exists) {
                this.logger.warn(`User with ID ${userId} does not exist.`);
                return;
            }

            const userData = userDoc.data();
            const schedule = userData?.schedule;
            const remainTime = userData?.remainTime || 0;

            if (!schedule) {
                this.logger.warn(`No schedule found for user ${userId}`);
                return;
            }

            const todaySchedule = schedule[currentDate];
            if (!todaySchedule) {
                this.logger.warn(`No schedule for user ${userId} on ${currentDate}`);
                return;
            }

            const { classes = [], exams = [], tasks = [] } = todaySchedule;
            const events = [...classes, ...exams, ...tasks];

            // Check if any event overlaps with the next hour
            const hasNextHourEvent = events.some(event => {
                const eventStartTime = moment(event.startingTime, 'HH:mm');
                const eventEndTime = event.endingTime
                    ? moment(event.endingTime, 'HH:mm')
                    : eventStartTime.clone().add(1, 'hour'); // Default duration is 1 hour

                return (
                    eventStartTime.isBefore(nextHourEnd) && eventEndTime.isAfter(nextHourStart)
                );
            });

            if (!hasNextHourEvent && remainTime > 0) {
                await this.sendPushNotification(
                    'Time to Study!',
                    `You have ${remainTime} hours left for study. Make the most of this free time!`
                );
            }
        } catch (error) {
            this.logger.error(`Error checking next-hour events for user ${userId}`, error.message);
        }
    }

    async resetRemainTime() {
        try {
            this.logger.log('Starting reset of remainTime.');

            // Fetch all user documents
            const usersSnapshot = await this.firestore.collection('users').get();

            // Reset remainTime for each user
            const updatePromises = usersSnapshot.docs.map(doc => {
                const userData = doc.data();
                const studyHours = userData.studyHours || 0; // Default to 0 if not defined
                return doc.ref.update({ remainTime: studyHours });
            });

            await Promise.all(updatePromises);

            this.logger.log('Successfully reset remainTime for all users.');
        } catch (error) {
            this.logger.error('Error resetting remainTime:', error.message);
        }
    }

    onModuleInit() {
        // Schedule notification checks every minute
        setInterval(() => {
            if (this.userId) {
                this.checkAndSendNotifications(this.userId);
            } else {
                this.logger.warn('UserId is not set. Notifications will not be checked.');
            }
        }, 60000); // 60,000 ms = 1 minute

        // Schedule next-hour checks every hour
        setInterval(() => {
            const currentHour = moment().hour();
            if (currentHour >= 8 && currentHour <= 22) { // 8 AM to 10 PM
                if (this.userId) {
                    this.checkNextHourForEvents(this.userId);
                } else {
                    this.logger.warn('UserId is not set. Next-hour notifications will not be checked.');
                }
            } else {
                this.logger.log(`Outside allowed time range for next-hour checks (8 AM - 10 PM). Current hour: ${currentHour}`);
            }
        }, 3600000);// 3,600,000 ms = 1 hour // 3,600,000 ms = 1 hour

        setInterval(() => {
            const now = moment();
            const isMonday = now.day() === 1; // Monday is day 1 in moment.js
            const isMidnight = now.hour() === 0 && now.minute() === 0;

            if (isMonday && isMidnight) {
                this.resetRemainTime();
            }
        }, 60000);
    }
}
