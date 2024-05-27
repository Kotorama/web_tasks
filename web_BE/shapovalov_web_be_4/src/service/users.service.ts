import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UUID } from 'mongodb';
import { Model } from 'mongoose';
import { UserDto } from 'src/models/user.dto';
import { Users, UsersDoc } from 'src/schema/users.schema';
import { UserAlreadyExists, UserNotFound } from 'src/shared';

@Injectable()

export class UserService {
  constructor(
    @InjectModel(Users.name)
    private readonly usersModel: Model<UsersDoc>,
  ) { }

  async register(body: UserDto) {
    if (await this.usersModel.findOne({ email: body.email })) {
      throw new UserAlreadyExists();
    }

    const apiKey = new UUID();

    const doc = new this.usersModel({ ...body, apiKey: apiKey });

    const user = await doc.save();

    return user.toObject();
  }

  async login(body: UserDto) {
    const user = await this.usersModel.findOne({ email: body.email });

    if (!user) {
      throw new UserNotFound();
    }

    console.log(user.toObject());

    return user.toObject();
  }
}

