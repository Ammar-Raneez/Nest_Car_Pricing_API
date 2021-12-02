/* eslint-disable prettier/prettier */
import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/users.entity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  // obj -> original object
  // take the userId from that original object and store in userId
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}