/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// create a table of users
@Entity()
export class User {
  // will be automatically generated (primary key)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  // exclude field when getting user - a rule we specify
  password: string;

  // typeorm hooks
  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id: ' + this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id: ' + this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('removed user with id: ' + this.id);
  }
}

// Nest's approach for excluding passwords will not work
// since we're editing the entity itself
// if for instance there's a route where it can get the attribute we've excluded will not be possible
// Therefore intercepting the response will be the best approach
