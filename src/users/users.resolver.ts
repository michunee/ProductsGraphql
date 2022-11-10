import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserDto } from './dtos/users.dto';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from './users.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';
import { MessageDto } from 'src/auth/dtos/message.dto';

@UseGuards(AuthGuard)
@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => UserDto)
  @Serialize(UserDto)
  async whoAmI(@CurrentUser() user: any) {
    return user;
  }

  @UseGuards(AdminGuard)
  @Query(() => [UserDto])
  @Serialize(UserDto)
  allUsers() {
    return this.usersService.find();
  }

  @UseGuards(AdminGuard)
  @Mutation(() => User)
  addUser(@Args('userData') user: CreateUserRoleDto) {
    return this.usersService.create(user);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => UserDto)
  deleteUser(@Args('userId') userId: number) {
    return this.usersService.remove(userId);
  }

  @Mutation(() => MessageDto)
  async changePassword(
    @Args('password') password: string,
    @CurrentUser() user: any,
  ) {
    await this.usersService.changePassword(password, user);
    return { message: 'Password changed successfully' };
  }
}
