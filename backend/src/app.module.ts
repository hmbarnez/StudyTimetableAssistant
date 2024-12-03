import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UserModule } from './user/user.module';
import { FirebaseModule } from './firebase/firebase.module';
import { NotificationModule } from './notifications/notification.module'; // Import the notification module

@Module({
  imports: [EventsModule, UserModule, FirebaseModule, NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
