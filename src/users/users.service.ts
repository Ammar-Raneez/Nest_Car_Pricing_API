import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    // create a User instance of typeorm repository
    // DI doesn't fare well with generics, so @InjectRepository says
    // that we need the User
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  create(email: string, password: string) {
    // create a user entity instance, create first, then save, rather than direcly saving an object
    // since any hook or validations are defined in the entity will not run
    const user = this.repo.create({ email, password });

    // save that instance to db
    return this.repo.save(user);
  }
}
