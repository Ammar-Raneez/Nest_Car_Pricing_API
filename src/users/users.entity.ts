/* eslint-disable prettier/prettier */
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