import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as nodemailer from 'nodemailer';
                                      
@Injectable()
export class NotificationsService {
    private readonly logger = new Logger(NotificationsService.name);
    private readonly transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'studyplannerappggc@gmail.com', // Use environment variables
            pass: 'StudyPlannerApp' // Use environment variables
        }
    });

    constructor() {
        if (admin.apps.length === 0) {
            this.logger.log('Initializing Firebase Admin SDK...');
            const serviceAccount = require('../serviceAccountKey.json');
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        }
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        const now = new Date();
        this.logger.debug('Running scheduled job at:', now);
        await this.checkAndSendNotifications(now);
    }

    private async checkAndSendNotifications(currentTime: Date) {
        this.logger.log('Checking for notifications...');
        const usersRef = admin.firestore().collection('users');
        const snapshot = await usersRef.get();
        snapshot.forEach(doc => {
            const user = doc.data();
            const today = currentTime.toISOString().split('T')[0];
            this.logger.log(`Checking schedule for user: ${user.email} on date: ${today}`);
            if (user.schedule && user.schedule[today]) {
                const dateSchedule = user.schedule[today];
                ['classes', 'exams', 'tasks'].forEach(type => {
                    dateSchedule[type]?.forEach(activity => {
                        if (this.shouldBeNotified(activity, currentTime, type, user.email)) {
                            this.sendEmail(activity, user.email, type);
                        }
                    });
                });
            }
        });
    }

    private shouldBeNotified(activity, currentTime, type, email) {
        const activityDateTime = `${activity.startingDate}T${activity.startingTime}:00`;

        // Create a Date object using the combined string
        const activityTime = new Date(activityDateTime); 
        const activityTimeStamp = activityTime.getTime();

        if (isNaN(activityTimeStamp)) {
            this.logger.error(`Invalid date or time format for activity. Date: ${activity.startingDate}, Time: ${activity.startingTime}`);
            return false; // Return false if date or time is invalid
        }

        const currentTimeStamp = currentTime.getTime();
        const diffMinutes = (activityTimeStamp - currentTimeStamp) / 60000;
        this.logger.debug(`Activity ${activity.subjectName || 'Unknown'} for ${email} starts in ${diffMinutes} minutes.`);

        return diffMinutes <= 30 && diffMinutes > 0;
    }


    private sendEmail(activity, email, type) {
        const mailOptions = {
            from: 'studyplannerappggc@gmail.com',
            to: email,
            subject: `Reminder: Your ${type} is starting soon!`,
            text: `Hi, just a reminder that your ${type}, ${activity.subjectName || ''}, is starting soon at ${activity.startingTime}.`
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                this.logger.error('Error sending email:', error);
            } else {
                this.logger.log('Email sent:', info.response);
            }
        });
    }
}
