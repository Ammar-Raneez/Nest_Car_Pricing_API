/* eslint-disable prettier/prettier */
import { Report } from 'src/reports/reports.entity';
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  // One user can have multiple reports
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
// Therefore intercepting the response, using a DTO that would descibe how to serialize for a specific route, will be the best approach
// without changing the entity
