import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

// scrypt returns a callback, using promisify we can make it return a promise instead
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(email: string, password: string) {
    const availableUser = await this.usersService.find(email);
    if (availableUser.length) {
      throw new BadRequestException('email in use');
    }

    // generate salt -> hash salt and password together -> join hashed result and salt together
    const salt = randomBytes(8).toString('hex'); // 16 char long random string
    const hash = (await scrypt(password, salt, 32)) as Buffer; // 32 character long hash
    const result = salt + '.' + hash; // use a '.' to separate the salt and hash to distinguish

    const newUser = await this.usersService.create(email, result);
    return newUser;
  }

  signin() {

  }
}
