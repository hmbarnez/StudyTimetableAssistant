// user/user.service.ts
import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly firebaseService: FirebaseService) { }

  // Method to create a new user
  async createUser(userData: UserEntity): Promise<string> {
    const userRef = await this.firebaseService.addUser(userData);
    return userRef; // Return the automatically generated user ID
  }


}
