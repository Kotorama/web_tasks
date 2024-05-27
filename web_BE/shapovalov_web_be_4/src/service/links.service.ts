import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UUID } from 'mongodb';
import { Model } from 'mongoose';
import { LinkDto } from 'src/models/link.dto';
import { UserDto } from 'src/models/user.dto';
import { Links, LinksDoc } from 'src/schema/links.schema';
import { Users, UsersDoc } from 'src/schema/users.schema';
import { LinkAlreadyExists, UserAlreadyExists, UserNotFound } from 'src/shared';

@Injectable()

export class LinksService {
  constructor(
    @InjectModel(Links.name)
    private readonly linksModel: Model<LinksDoc>,
  ) { }

  async shortenLink(body: LinkDto & { user: string }) {
    if (await this.linksModel.findOne({ link: body.originalLink })) {
      throw new LinkAlreadyExists();
    }

    var expDate = new Date();

    expDate.setTime(expDate.getTime() + (5 * 24 * 60 * 60 * 1000));


    console.log("date is ", expDate);

    var crypto = require("crypto");
    var shortLink = crypto.randomBytes(4).toString('hex');

    console.log(shortLink);

    const doc = new this.linksModel({ link: body.originalLink, shortLink: shortLink, expireAt: expDate, user: body.user });

    const link = await doc.save();

    return link;
  }
}

