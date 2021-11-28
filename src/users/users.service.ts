import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: number) {
    // find by id, if by attribute - ({ email: 'asdasdads'})
    return this.repo.findOne(id);
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  // can have some or all of the attributes of User
  async update(id: number, attrs: Partial<User>) {
    // directly calling repo.update will not run hooks, therefore this approach is better
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // copy all values of attrs into user overwriting any that were present
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    // same with delete/remove, any hooks will not run if we call delete()
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(user);
  }
}

// note to know
// NotFoundException etc. are http specific, therefore if we throw an exception from
// this service, if we were to use this service for other controllers (websockets)
// the websocket controller cannot handle them (like http controllers)
