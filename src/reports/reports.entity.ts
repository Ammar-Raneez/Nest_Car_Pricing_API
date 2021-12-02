/* eslint-disable prettier/prettier */
import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  // Many reports belong to a single user
  // This decorator will also adda a column to the report table
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}

// a function is passed rather than the class itself, is to overcome the
// circular dependency issue of typescript (has a chance of being undefined)
// wrapping it in a function solves it