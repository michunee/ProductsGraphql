import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = GqlExecutionContext.create(context).getContext().req;
    return request.user;
  }
}
