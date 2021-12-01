/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// inspect incoming request of any type (grpc/http/graphql)
export const CurrentUser = createParamDecorator(
  // data would usually be the first arg we pass when calling the decorator
  // since we'll never pass an arg it'll always be never
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request.session.userId);

    return request.currentUser;
  }
)

// Our param decorator cannot access the DI system, therefore accessing
// userService to get the current user is not possible. However, an
// Interceptor can be used to get the current user, and pass in that
// value to this decorator