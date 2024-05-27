import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from 'src/models/user.dto';
import { UserService } from 'src/service/users.service';
@Controller({ path: '/users' })
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @Post('/')
  async register(@Body() body: UserDto) {
    try {
      const user = await this.userService.register({ ...body });
      return user;
    } catch (err) {
      throw err;
    }
  }

  @Post('/login')
  async login(@Body() body: UserDto) {
    try {
      const user = await this.userService.login({ ...body });

      return user;
    } catch (err) {
      throw err;
    }
  }
}