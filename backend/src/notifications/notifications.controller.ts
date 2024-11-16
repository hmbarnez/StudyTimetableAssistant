import { Controller, Post, Body } from '@nestjs/common';
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
}
