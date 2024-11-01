import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Firestore } from '@google-cloud/firestore';
import { UserEntity } from 'src/user/user.entity';
import * as serviceAccount from '../serviceAccountKey.json'; // Adjust the path based on where your file is located

// Initialize Firebase app once at the top
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

@Injectable()
export class FirebaseService {
  private firestore: Firestore;

  constructor() {
    this.firestore = admin.firestore();

    // Enable Firestore to ignore undefined properties
    this.firestore = admin.firestore();
    this.firestore.settings({ ignoreUndefinedProperties: true });
  }

}
