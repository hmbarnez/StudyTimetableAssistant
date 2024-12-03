import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationService } from './notification.service';
import { NotificationController } from './notifications.controller';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [ScheduleModule.forRoot(), UserModule], // Enable scheduling in this module
    providers: [NotificationService],
    controllers: [NotificationController],
    exports: [NotificationService],
})
export class NotificationModule { }
