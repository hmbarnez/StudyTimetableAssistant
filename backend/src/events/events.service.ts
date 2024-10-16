import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import { EventEntity } from './event.entity';
import moment from 'moment'; //moment.js for date manipulation

@Injectable()
export class EventsService {
  private firestore: Firestore;

  constructor() {
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
          userData.schedule[dateKey].classes.push({ ...eventData, id: eventId });
        } else if (eventData.type === 'exam') {
          userData.schedule[dateKey].exams.push({ ...eventData, id: eventId });
        } else if (eventData.type === 'task') {
          userData.schedule[dateKey].tasks.push({ ...eventData, id: eventId });
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

  async deleteEvent(): Promise<void> {

  }

  async deleteFutureEvent(): Promise<void> {

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