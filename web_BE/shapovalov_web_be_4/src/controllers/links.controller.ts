import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { LinkDto } from 'src/models/link.dto';
import { UserDto } from 'src/models/user.dto';
import { UsersLeanDoc } from 'src/schema/users.schema';
import { LinksService } from 'src/service/links.service';


@Controller({ path: '/links' })
export class LinksController {
  constructor(private readonly linksService: LinksService) { }

  @Post('/')
  async shorten(
    @Body() body: LinkDto,
    @Req() req: Request & { user: UsersLeanDoc },) {
    try {
      const link = await this.linksService.shortenLink({ ...body, email: req.user.email });
      return link;
    } catch (err) {
      throw err;
    }
  }

  @Get('/')
  async filterByDate(
    @Body() body: LinkDto,
    @Req() req: Request & { user: UsersLeanDoc },
    @Query('expiredAt') expiredAt?: { "gt"?: Date, "lt"?: Date }) {
    try {
      console.log(expiredAt)
      const links = await this.linksService.findLinks({ ...body, email: req.user.email, gt: expiredAt.gt, lt: expiredAt.lt });
      return links;
    } catch (err) {
      throw err;
    }
  }
}