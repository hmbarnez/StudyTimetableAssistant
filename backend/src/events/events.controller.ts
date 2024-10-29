import { Controller, Post, Param, Body, Get, Patch, Delete } from '@nestjs/common';
import { EventEntity } from './event.entity';
import { EventsService } from './events.service';


@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Post(':userId')
    async createEvent(
        @Param('userId') userId: string,
        @Body() eventData: EventEntity
    ) {
        return await this.eventsService.addEvent(userId, eventData);
    }

    // Endpoint to get a specific event
    @Get(':userId/date/:date/event/:eventId')
    async getEvent(
        @Param('userId') userId: string,
        @Param('eventId') eventId: string,
        @Param('date') date: string
    ) {
        return await this.eventsService.getEvent(userId, eventId, date);
    }

    // Endpoint to get all events for a specific date
    @Get(':userId/date/:date')
    async getAllEventsForDate(
        @Param('userId') userId: string,
        @Param('date') date: string
    ) {
        return await this.eventsService.getAllEventsForDate(userId, date);
    }

    @Get(':userId')
    async getAllEvents(@Param('userId') userId: string): Promise<{ [date: string]: { classes: any[]; exams: any[]; tasks: any[] } }> {
        try {
            return await this.eventsService.getAllEvents(userId);
        } catch (error) {
            throw new Error(`Failed to retrieve events for user with ID ${userId}: ${error.message}`);
        }
    }

    @Patch(':userId/date/:date/event/:eventId')
    async updateEvent(
        @Param('userId') userId: string,
        @Param('eventId') eventId: string,
        @Param('date') date: string,
        @Body() updatedEventData: Partial<EventEntity>
    ) {
        await this.eventsService.updateEvent(userId, eventId, date, updatedEventData);
        return { message: 'Event updated successfully' };
    }

    @Patch(':userId/date/:date/event/:eventId/future')
    async updateFutureEvent(
        @Param('userId') userId: string,
        @Param('eventId') eventId: string,
        @Param('date') date: string,
        @Body() updatedEventData: Partial<EventEntity>
    ) {

        await this.eventsService.updateFutureEvent(userId, eventId, date, updatedEventData);
        return { message: 'Event updated successfully' };

    }

    @Delete(':userId/date/:date/event/:eventId')
    async deleteEvent(
        @Param('userId') userId: string,
        @Param('eventId') eventId: string,
        @Param('date') date: string,
    ) {

        await this.eventsService.deleteEvent(userId, eventId, date);
        return { message: 'Event updated successfully' };

    }

    @Delete(':userId/date/:date/event/:eventId/future')
    async deleteFutureEvents(
        @Param('userId') userId: string,
        @Param('eventId') eventId: string,
        @Param('date') date: string,
    ) {

        await this.eventsService.deleteFutureEvent(userId, eventId, date);
        return { message: 'Event updated successfully' };

    }

}
