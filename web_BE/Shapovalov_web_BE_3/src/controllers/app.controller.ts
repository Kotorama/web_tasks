import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getAnswer(): string {
    return 'Hello'
  }
}