import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from 'src/roles/roles.module';

@Global()
@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: 'my-secret-key',
    }),
    RolesModule,
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
