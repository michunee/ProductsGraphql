import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminGuard } from 'src/guards/admin.guard';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';

@Resolver()
export class RolesResolver {
  constructor(private rolesService: RolesService) {}

  @Query(() => [Role])
  allRoles() {
    return this.rolesService.findAll();
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Role)
  createRole(@Args('roleName') roleName: string) {
    return this.rolesService.createRole(roleName);
  }
}
