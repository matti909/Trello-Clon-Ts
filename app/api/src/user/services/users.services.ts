import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}
  getHello(): string {
    return 'hello my friend';
  }
}
