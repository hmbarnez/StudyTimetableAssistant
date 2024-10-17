import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
  private firestore: Firestore;

  constructor() {
    this.firestore = admin.firestore();;
  }

  // Create a new user
  async createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
    const newUserRef = this.firestore.collection('users').doc();

    const hashedPassword = await this.hashPassword(userData.password);

    const newUser = {
      ...userData,
      id: newUserRef.id,
      password: hashedPassword, // Store the hashed password
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await newUserRef.set(newUser);
    return newUser as UserEntity;
  }

  // Read (Retrieve) a user by ID
  async getUserById(userId: string): Promise<UserEntity> {
    const userRef = this.firestore.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    return userSnapshot.data() as UserEntity;
  }

  // Update an existing user
  async updateUser(userId: string, updatedData: Partial<UserEntity>): Promise<void> {
    const userRef = this.firestore.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    await userRef.update({
      ...updatedData,
      updatedAt: new Date(),
    });
  }

  // Delete a user by ID
  async deleteUser(userId: string): Promise<void> {
    const userRef = this.firestore.collection('users').doc(userId);
    await userRef.delete();
  }

  // Retrieve all users
  async getAllUsers(): Promise<UserEntity[]> {
    const usersSnapshot = await this.firestore.collection('users').get();
    return usersSnapshot.docs.map((doc) => doc.data() as UserEntity);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
