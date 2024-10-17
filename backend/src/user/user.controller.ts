import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  // Create a new user
  @Post()
  async createUser(@Body() userData: Partial<UserEntity>): Promise<UserEntity> {
    return this.usersService.createUser(userData);
  }

  // Get a user by ID
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.getUserById(id);
  }

  // Update an existing user
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatedData: Partial<UserEntity>,
  ): Promise<void> {
    return this.usersService.updateUser(id, updatedData);
  }

  // Delete a user by ID
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
