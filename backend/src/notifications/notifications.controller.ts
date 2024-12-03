import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post('register')
    async registerToken(@Body() body: { token: string }) {
        const { token } = body;
        this.notificationService.setExpoPushToken(token); // Set token in the service
        return { message: 'Token registered successfully' };
    }

    @Post('id')
    async getUserId(@Body() body: { userId: string }) {
        const { userId } = body;

        // Validate userId
        if (!userId) {
            throw new BadRequestException('userId is required');
        }
        this.notificationService.setUserId(userId);
        return { message: `UserId ${userId} received successfully` };
    }
}
