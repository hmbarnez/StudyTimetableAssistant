import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<Omit<UserEntity, 'password'>> {
    return this.userService.loginUser(email, password);
  }

  @Post('logout')
  async logout(): Promise<string> {
    return this.userService.logoutUser();
  }

  @Post('signup')
  async signUp(
    @Body() userData: Partial<UserEntity>,
    @Body('password') password: string
  ): Promise<Omit<UserEntity, 'password'>> {
    return this.userService.signUp(userData, password);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Body('password') password: string
  ): Promise<void> {
    return this.userService.deleteUser(id, password);
  }
}
