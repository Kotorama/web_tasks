import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NextFunction } from 'express';
import { Users, UsersDoc, UsersLeanDoc } from 'src/schema/users.schema';

@Injectable()
export class UserAuthorizationMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<UsersDoc>,
  ) { }

  async use(
    req: Request & { user: UsersLeanDoc },
    res: Response,
    next: NextFunction,
  ) {
    const { authorization } = req.headers as any;

    if (!authorization) {
      throw new UnauthorizedException(
        `User did not provide api key`,
      );
    }

    const user = await this.userModel.findOne({ apiKey: authorization });

    if (!user) {
      throw new BadRequestException(
        `User with such api key was not found`,
      );
    }

    req.user = user.toObject();

    next();
  }
}
