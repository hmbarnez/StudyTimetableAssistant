import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import axios from 'axios';
import moment from 'moment';
import { Firestore } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService implements OnModuleInit {
    private readonly logger = new Logger(NotificationService.name);
    private firestore: Firestore;
    private expoPushToken: string; // Expo push token

    constructor() {
        this.firestore = admin.firestore();
    }

    // Set Expo Push Token dynamically
    setExpoPushToken(token: string) {
        this.expoPushToken = token;
        this.logger.log(`Expo Push Token set: ${token}`);
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
    async checkAndSendNotifications() {
        const currentDate = moment().format('YYYY-MM-DD'); // Get current date
        const currentTime = moment(); // Current time

        try {
            // Fetch all users and their schedules
            const usersSnapshot = await this.firestore.collection('users').get();

            for (const userDoc of usersSnapshot.docs) {
                const userData = userDoc.data();
                const schedule = userData.schedule;

                if (!schedule) continue; // Skip if the user has no schedule

                // Iterate over the schedule for the current day
                const todaySchedule = schedule[currentDate];
                if (!todaySchedule) continue; // Skip if there's no schedule for today

                // Check classes, exams, and tasks
                const { classes = [], exams = [], tasks = [] } = todaySchedule;
                const events = [...classes, ...exams, ...tasks];

                for (const event of events) {
                    const eventStartTime = moment(event.startingTime, 'HH:mm'); // Event's starting time
                    const diffInMinutes = eventStartTime.diff(currentTime, 'minutes');
                    // Send notification 1 hour before the event starts
                    if (diffInMinutes === 60) {
                        await this.sendPushNotification(event.subjectName, event.startingTime);
                    }
                }
            }
        } catch (error) {
            this.logger.error('Error fetching or processing events', error);
        }
    }

    // Run on module initialization
    onModuleInit() {
        // Schedule a check for notifications every minute
        setInterval(() => {
            this.checkAndSendNotifications();
        }, 600); // 60,000 ms = 1 minute
    }
}
