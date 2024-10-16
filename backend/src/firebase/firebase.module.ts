// firebase.module.ts
import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],  // Exporting the FirebaseService so it can be used in other modules
})
export class FirebaseModule { }
