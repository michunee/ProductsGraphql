import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Expose, Transform } from 'class-transformer';

@ObjectType()
export class ProductDto {
  @Field(() => Int)
  @Expose()
  id: number;

  @Field(() => String)
  @Expose()
  name: string;

  @Field(() => String)
  @Expose()
  description: string;

  @Field(() => Int)
  @Expose()
  price: number;

  @Field(() => String)
  @Transform(({ obj }) => obj.user.email)
  @Expose()
  userEmail: string;

  @Field(() => [String])
  @Transform(({ obj }) => obj.categories.map((category) => category.name))
  @Expose()
  categories: string[];
}
