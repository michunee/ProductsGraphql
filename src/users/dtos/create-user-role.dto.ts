import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserRoleDto {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => [String])
  @IsString({ each: true })
  roleName: string[];
}
