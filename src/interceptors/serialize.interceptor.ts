/* eslint-disable prettier/prettier */
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from 'src/users/dtos/user.dto';

// Apply an intercept to all methods of a controller/specific method/all controllers
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // run something before request is handled by the request handler
    // console.log('Im running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(UserDto, data, {
          // only allow attributes that we've specified Expose for
          excludeExtraneousValues: true,
        })
        // runs before response is sent
        // console.log('Im running before the response is sent', data);
      })
    );
  }
}