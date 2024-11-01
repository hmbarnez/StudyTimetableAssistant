import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as admin from 'firebase-admin';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  private firestore: Firestore;

  constructor() {
    this.firestore = admin.firestore();
  }

  // Create a new user (sign-up)
  async signUp(userData: UserEntity, password: string): Promise<{ token: string; user: Omit<UserEntity, 'password'> }> {
    const newUserRef = this.firestore.collection('users').doc();
    const hashedPassword = await this.hashPassword(password);

    const newUser = {
      ...userData,
      id: newUserRef.id,
      password: hashedPassword,
    };

    await newUserRef.set(newUser);

    // Omit the password field for the return value
    const { password: _password, ...userWithoutPassword } = newUser;

    const token = this.generateToken(newUserRef.id); // Generate JWT
    return { token, user: userWithoutPassword as Omit<UserEntity, 'password'> }; // Ensure correct type
  }

  // Login user with email and password
  async loginUser(email: string, password: string): Promise<{ token: string; user: Omit<UserEntity, 'password'> } | null> {
    const userSnapshot = await this.firestore.collection('users').where('email', '==', email).limit(1).get();

    if (userSnapshot.empty) {
      throw new Error('User with this email does not exist.');
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data() as UserEntity & { password: string };

    // Check if the plain password matches the hashed password
    const passwordMatches = await this.comparePassword(password, userData.password);
    if (!passwordMatches) {
      throw new Error('Invalid credentials.');
    }

    // Destructure userData but rename the password variable
    const { password: _password, ...userWithoutSensitiveData } = userData;
    const token = this.generateToken(userDoc.id); // Generate JWT
    return { token, user: userWithoutSensitiveData };
  }

  // Logout user (typically handled client-side)
  async logoutUser(): Promise<string> {
    return 'User logged out successfully.';
  }

  // Get user by ID
  async getUserById(userId: string): Promise<Omit<UserEntity, 'password' | 'schedule'>> {
    const userRef = this.firestore.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const userData = userSnapshot.data() as UserEntity & { password: string; schedule: {} };
    const { password, schedule, ...userWithoutSensitiveData } = userData;

    return userWithoutSensitiveData;
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
    });
  }

  // Delete a user by ID and password
  async deleteUser(userId: string, password: string): Promise<void> {
    const userRef = this.firestore.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const userData = userSnapshot.data() as UserEntity & { password: string };

    const passwordMatches = await this.comparePassword(password, userData.password);
    if (!passwordMatches) {
      throw new Error('Invalid password.');
    }

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

  private async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  private generateToken(userId: string): string {
    const payload = { id: userId };
    return sign(payload, '3005', { expiresIn: '1h' }); // Use a strong secret and consider environment variables for production
  }

}
