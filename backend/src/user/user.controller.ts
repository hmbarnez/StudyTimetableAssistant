import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Controller('users')
export class UserController {
  constructor(private readonly firebaseService: FirebaseService) { }

  @Get()
  async getUsers() {
    return await this.firebaseService.getAllUsers();
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    const userId = await this.firebaseService.loginUser(email, password);
    return { userId };  // Return the user ID if login successful
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.firebaseService.getUserById(id);
  }



}
