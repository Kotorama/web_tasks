import {
  BadRequestException,
  Body,
  Req,
  Controller,
  Get,
  Post,
  Headers,
} from '@nestjs/common';
import { UserService } from '../service';
import { InnerUserDto, LoginDto, UserDto } from '../models';
import { UserAlreadyExists, UserNotFound } from '../shared';

@Controller({ path: '/users' })
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @Post('/')
  async createUser(@Body() body: UserDto) {
    try {
      const result = await this.userService.createUser(body);
      return result;
    } catch (err) {
      if (err instanceof UserAlreadyExists) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    try {
      const result = await this.userService.login(body);
      return { token: result };
    } catch (err) {
      if (err instanceof UserNotFound) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }

  @Get('/')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}

@Controller({ path: '/driver' })
export class DriverController {
  constructor(private readonly userService: UserService) { }

  @Post('/')
  async createDriver(@Body() body: InnerUserDto) {

    try {
      const result = await this.userService.createDriver(body);
      return result;
    } catch (err) {
      if (err instanceof UserAlreadyExists) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }
}

@Controller({ path: '/admin' })
export class AdminController {
  constructor(private readonly userService: UserService) { }

  @Post('/')
  async createAdmin(@Body() body: InnerUserDto, @Req() req: Request, @Headers('authorization') authorization?: string) {

    if (authorization !== 'quake3Arena') {
      throw new BadRequestException('Authorization error!')
    }

    try {
      const result = await this.userService.createAdmin(body);
      return result;
    } catch (err) {
      if (err instanceof UserAlreadyExists) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }
}
