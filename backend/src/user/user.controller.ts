import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<{ token: string; user: Omit<UserEntity, 'password'> }> {
    const { token, user } = await this.userService.loginUser(email, password);
    return { token, user };
  }

  @Post('logout')
  async logout(): Promise<string> {
    return this.userService.logoutUser();
  }

  @Post('signup')
  async signUp(
    @Body() userData: UserEntity, // Accept full UserEntity
    @Body('password') password: string
  ): Promise<{ token: string; user: Omit<UserEntity, 'password'> }> {
    const { token, user } = await this.userService.signUp(userData, password);
    return { token, user };
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updatedData: Partial<UserEntity>
  ): Promise<UserEntity> {
    await this.userService.updateUser(userId, updatedData);

    // Await the result before logging it
    const updatedUser = await this.userService.getUserById(userId);
    return updatedUser; // Return the updated user
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Body('password') password: string
  ): Promise<void> {
    return this.userService.deleteUser(id, password);
  }
}
