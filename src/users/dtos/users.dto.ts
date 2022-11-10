import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Expose, Transform } from 'class-transformer';

@ObjectType()
export class UserDto {
  @Field(() => Int)
  @Expose()
  id: number;

  @Field(() => String)
  @Expose()
  email: string;

  @Field(() => [String])
  @Transform(({ obj }) => obj.roles.map((role) => role.name))
  @Expose()
  roles: string[];
}
