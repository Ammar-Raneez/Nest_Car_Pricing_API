/* eslint-disable prettier/prettier */
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Apply an intercept to all methods of a controller/specific method/all controllers
export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // run something before request is handled by the request handler
    // console.log('Im running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          // only allow attributes that we've specified Expose for
          excludeExtraneousValues: true,
        })
        // runs before response is sent
        // console.log('Im running before the response is sent', data);
      })
    );
  }
}