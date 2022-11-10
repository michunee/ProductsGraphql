import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = GqlExecutionContext.create(context).getContext().req;
    const roleArray = request.user.roles.map((role) => role.name);
    return roleArray.includes('admin');
  }
}
