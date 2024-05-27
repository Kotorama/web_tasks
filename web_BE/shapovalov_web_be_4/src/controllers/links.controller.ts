import { Body, Controller, Get, Post, Req } from '@nestjs/common';
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
    @Req() req: Request & { user: UsersLeanDoc }) {
    try {
      const link = await this.linksService.shortenLink({ ...body, user: req.user.email });
      return link;
    } catch (err) {
      throw err;
    }
  }
}