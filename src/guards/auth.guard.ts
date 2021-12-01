/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext } from '@nestjs/common';

// This auth guard can too be used with any communication protocol
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}