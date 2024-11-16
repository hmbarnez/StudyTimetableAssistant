import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationService } from './notification.service';
import { NotificationController } from './notifications.controller';

@Module({
    imports: [ScheduleModule.forRoot()], // Enable scheduling in this module
    providers: [NotificationService],
    controllers: [NotificationController],
    exports: [NotificationService],
})
export class NotificationModule { }
