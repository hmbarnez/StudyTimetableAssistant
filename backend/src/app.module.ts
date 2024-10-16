import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UserModule } from './user/user.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [EventsModule,  UserModule, FirebaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
