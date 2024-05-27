import { BadRequestException } from "@nestjs/common";

export class UserNotFound extends Error {
  constructor() {
    super('User was not found');
  }
}

export class UserAlreadyExists extends BadRequestException {
  constructor() {
    super('User with this email already exists');
  }
}

export class LinkAlreadyExists extends BadRequestException {
  constructor() {
    super('Short link already exists');
  }
}

