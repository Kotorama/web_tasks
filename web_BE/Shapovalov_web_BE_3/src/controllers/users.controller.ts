import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  Headers
} from '@nestjs/common';
import { UserService } from '../service';
import { InternalUserDto, LoginDto, UserDto } from '../models';
import { UserAlreadyExists, UserNotFound } from '../shared';

@Controller({ path: '/users' })
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @Post('/')
  async createCustomer(@Body() body: UserDto) {
    body.role = 'Customer';
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

@Controller({ path: '/admin' })
export class AdminController {
  constructor(private readonly userService: UserService) { }

  @Post('/')
  async createAdmin(@Body() body: InternalUserDto, @Req() req: Request, @Headers('authorization') authorization?: string) {

    body.role = 'Admin';

    console.log(authorization)
    if (authorization !== 'quake3arena') {
      throw new UnauthorizedException('Authorization error')
    }

    try {
      const result = await this.userService.createInternalUser(body);
      return result;
    } catch (err) {
      if (err instanceof UserAlreadyExists) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }
}

@Controller({ path: '/driver' })
export class DriverController {
  constructor(private readonly userService: UserService) { }

  @Post('/')
  async createDriver(@Body() body: InternalUserDto, @Req() req: Request) {

    body.role = 'Driver';

    try {
      const result = await this.userService.createInternalUser(body);
      return result;
    } catch (err) {
      if (err instanceof UserAlreadyExists) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }
}
