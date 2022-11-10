import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/users.entity';
import { AuthService } from './auth.service';
import { MessageDto } from './dtos/message.dto';
import { TokenDto } from './dtos/token.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  signup(@Args('userData') user: CreateUserDto) {
    return this.authService.signup(user);
  }

  @Mutation(() => TokenDto)
  async signin(@Args('userData') user: CreateUserDto, @Context() context: any) {
    const newUser = await this.authService.signin(user);
    const accessToken = this.authService.createAccessToken(newUser);
    context.res.cookie('token', accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    });
    return { accessToken };
  }

  @Mutation(() => MessageDto)
  signout(@Context() context: any) {
    context.res.clearCookie('token');
    return { message: 'Signout successfuly!' };
  }
}
