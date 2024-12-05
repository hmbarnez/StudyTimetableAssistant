import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import { EventEntity } from './event.entity';
import moment from 'moment'; //moment.js for date manipulation
import { UserService } from 'src/user/user.service';

@Injectable()
export class EventsService {
  private firestore: Firestore;

  constructor(private readonly userService: UserService) {
    this.firestore = admin.firestore();
  }

  async addEvent(userId: string, eventData: EventEntity): Promise<void> {

    const userRef = this.firestore.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const userData = userSnapshot.data();
    if (!userData.schedule) {
      userData.schedule = {};
    }

    const startDate = moment(eventData.startingDate, 'YYYY-MM-DD');
    const endDate = moment(eventData.endingDate, 'YYYY-MM-DD');
    const eventDays = eventData.eventDays;

    const eventId = this.firestore.collection('users').doc().id;

    const user = await this.userService.getUserById(userId);
    const userType = user.type;

    const notificationOffsetsMapping: { [key: string]: number[] } = {
      'Focused Learner': [30],
      'Balanced Student': [30, 60],
      'Distracted Student': [15, 30, 60],
      'Procrastinator': [15, 30, 60, 120],
    };

    const notificationOffsets = notificationOffsetsMapping[userType] || [];

    for (let m = startDate.clone(); m.isSameOrBefore(endDate); m.add(1, 'days')) {
      const currentDay = m.format('dddd'); // Get the current day of the week (e.g., "Monday")


      if (eventDays.includes(currentDay)) {
        // const eventId = this.firestore.collection('users').doc().id; // Generate a unique ID
        // Ensure the date exists in the schedule
        const dateKey = m.format('YYYY-MM-DD');
        if (!userData.schedule[dateKey]) {
          userData.schedule[dateKey] = { classes: [], exams: [], tasks: [] };
        }

        // Add the event to the correct section based on the event type
        if (eventData.type === 'class') {
          userData.schedule[dateKey].classes.push({ ...eventData, id: eventId, notificationOffsets: notificationOffsets });
        } else if (eventData.type === 'exam') {
          userData.schedule[dateKey].exams.push({ ...eventData, id: eventId, notificationOffsets: notificationOffsets });
        } else if (eventData.type === 'task') {
          userData.schedule[dateKey].tasks.push({ ...eventData, id: eventId, notificationOffsets: notificationOffsets });
          if (eventData.taskStudy) {
            const eventStartTime = moment(eventData.startingTime, 'HH:mm');
            const eventEndTime = moment(eventData.endingTime, 'HH:mm');
            const studyTime = eventEndTime.diff(eventStartTime, 'minutes');
            userData.remainTime = Math.max(0, ((userData.remainTime * 60) - studyTime) / 60);
            await userRef.update({ remainTime: userData.remainTime });
            console.log(`Updated remainTime: ${userData.remainTime}`);
          }
        }
      }
    }

    // Update the user's schedule in Firestore
    await userRef.update({ schedule: userData.schedule });

  }

  async getEvent(userId: string, eventId: string, date: string): Promise<EventEntity | null> {
    const userRef = this.firestore.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const userData = userSnapshot.data();

    if (!userData.schedule) {
      return null; // No schedule found
    }

    // Iterate through the schedule to find the event by ID

    const { classes, exams, tasks } = userData.schedule[date];

    // Check in classes
    const eventInClass = classes.find(event => event.id === eventId);
    if (eventInClass) return eventInClass;

    // Check in exams
    const eventInExam = exams.find(event => event.id === eventId);
    if (eventInExam) return eventInExam;

    // Check in tasks
    const eventInTask = tasks.find(event => event.id === eventId);
    if (eventInTask) return eventInTask;


    return null; // Event not found
  }

  async getAllEventsForDate(userId: string, date: string): Promise<{ classes: any[]; exams: any[]; tasks: any[] }> {
    const userRef = this.firestore.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const userData = userSnapshot.data();

    // Check if the schedule for the specified date exists
    if (!userData.schedule || !userData.schedule[date]) {
      return { classes: [], exams: [], tasks: [] }; // Return empty arrays for each type
    }

    const { classes = [], exams = [], tasks = [] } = userData.schedule[date];

    return {
      classes,
      exams,
      tasks,
    };
  }

  async getAllEvents(userId: string): Promise<{ [date: string]: { classes: any[]; exams: any[]; tasks: any[] } }> {
    const userRef = this.firestore.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const userData = userSnapshot.data();

    // If the schedule doesn't exist, initialize it as an empty object and update Firestore
    if (!userData.schedule) {
      const emptySchedule = {}; // Initialize an empty schedule
      await userRef.update({ schedule: emptySchedule }); // Update Firestore with the empty schedule
      return emptySchedule; // Return the empty schedule
    }

    return userData.schedule; // Return the existing schedule
  }

  async updateEvent(userId: string, eventId: string, date: string, updatedData: Partial<EventEntity>): Promise<void> {

    // Retrieve the user document
    const userRef = this.firestore.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const userData = userSnapshot.data();
    const schedule = userData.schedule;

    // Check if the schedule exists
    if (!schedule) {
      throw new Error(`No schedule found for user with ID ${userId}.`);
    }

    // Iterate through each date in the schedule to find the event

    const { classes, exams, tasks } = schedule[date];

    // Check for the event in the classes, exams, and tasks
    const sections = { classes, exams, tasks };

    for (const section in sections) {
      const events = sections[section];
      const eventIndex = events.findIndex(e => e.id === eventId);

      // If the event is found, update it
      if (eventIndex !== -1) {
        const currentEvent = events[eventIndex];

        // Update the fields of the event (excluding startingDate and endingDate)
        Object.assign(currentEvent, updatedData); // Merge updated data

        // Break after updating to avoid unnecessary checks
        break;
      }
    }


    // Save the updated schedule back to Firestore
    await userRef.update({ schedule });
  }

  async updateFutureEvent(userId: string, eventId: string, date: string, updatedData: Partial<EventEntity>): Promise<void> {
    const event = await this.getEvent(userId, eventId, date);

    // Generate all future dates where the event repeats based on the pattern
    const futureDates = this.generateFutureDates(date, event.endingDate, event.eventDays);

    // Iterate over all future dates and update the event for each date
    for (const date of futureDates) {
      try {
        // Use the existing updateEvent method to update each future event
        await this.updateEvent(userId, eventId, date, updatedData);
      } catch (error) {
        console.error(`Error updating event on date ${date}:`, error.message);
      }
    }
  }

  async deleteEvent(userId: string, eventId: string, date: string): Promise<void> {
    // Get the event using the getEvent method
    const event = await this.getEvent(userId, eventId, date);

    if (!event) {
      throw new Error(`Event with ID ${eventId} on date ${date} not found.`);
    }

    // Retrieve the user document reference
    const userRef = this.firestore.collection('users').doc(userId);
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data();
    const schedule = userData.schedule;

    // Find the event and remove it from the appropriate section (classes, exams, tasks)
    const { classes, exams, tasks } = schedule[date];

    if (event.type === 'class') {
      schedule[date].classes = classes.filter(e => e.id !== eventId);
    } else if (event.type === 'exam') {
      schedule[date].exams = exams.filter(e => e.id !== eventId);
    } else if (event.type === 'task') {
      schedule[date].tasks = tasks.filter(e => e.id !== eventId);
    }

    // Update the Firestore document
    await userRef.update({ schedule });
  }

  async deleteFutureEvent(userId: string, eventId: string, date: string): Promise<void> {
    //Get the event using the getEvent method
    const event = await this.getEvent(userId, eventId, date);

    if (!event) {
      throw new Error(`Event with ID ${eventId} on date ${date} not found.`);
    }

    //Generate all future dates where the event repeats based on the pattern
    const futureDates = this.generateFutureDates(date, event.endingDate, event.eventDays);

    // Iterate over all future dates and delete the event for each date
    for (const futureDate of futureDates) {
      try {
        // Use the existing deleteEvent method to delete each future event
        await this.deleteEvent(userId, eventId, futureDate);
      } catch (error) {
        console.error(`Error deleting event on date ${futureDate}:`, error.message);
      }
    }
  }


  generateFutureDates(startingDate: string, endingDate: string, eventDays: string[]): string[] {
    const start = moment(startingDate, 'YYYY-MM-DD'); // Parse the starting date
    const end = moment(endingDate, 'YYYY-MM-DD'); // Parse the ending date
    const futureDates: string[] = [];

    // Loop through the date range
    while (start.isSameOrBefore(end)) {
      const dayOfWeek = start.format('dddd'); // Get the day of the week (e.g., 'Monday')

      // Check if the current day of the week is in the eventDays array
      if (eventDays.includes(dayOfWeek)) {
        futureDates.push(start.format('YYYY-MM-DD')); // Add the valid date to the array
      }

      start.add(1, 'day'); // Move to the next day
    }

    return futureDates;
  }

}
