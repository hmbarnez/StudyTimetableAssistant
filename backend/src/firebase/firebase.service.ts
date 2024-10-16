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

  // Method to add a user to the Firestore collection
  async addUser(userData: UserEntity): Promise<string> {
    const userRef = this.firestore.collection('users').doc(); // Auto-generate ID
    await userRef.set(userData); // Store the user data
    return userRef.id; // Return the auto-generated ID
  }

  // Method to retrieve all users from the Firestore collection
  async getAllUsers(): Promise<any[]> {
    const usersCollection = this.firestore.collection('users');
    const snapshot = await usersCollection.get();
    const users: any[] = [];

    snapshot.forEach((doc) => {
      users.push(doc.data());
    });

    return users;
  }

  async loginUser(email: string, password: string): Promise<string | null> {
    if (!email || !password) {
      throw new Error('Email and password must be provided');
    }

    const usersCollection = this.firestore.collection('users');
    const snapshot = await usersCollection.where('email', '==', email).get();

    if (snapshot.empty) {
      throw new Error('User not found');
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Verify the password
    if (userData.password === password) {
      return userDoc.id;  // Return user ID if password matches
    } else {
      throw new Error('Invalid credentials');
    }
  }

  // Fetch user by ID
  async getUserById(userId: string): Promise<any> {
    const userDoc = await this.firestore.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    return userDoc.data();
  }
}
