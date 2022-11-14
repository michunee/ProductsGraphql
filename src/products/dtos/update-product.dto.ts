import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateProductDto {
  @Field(() => Int)
  @IsNumber()
  id: number;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => Int)
  @IsNumber()
  price: number;

  @Field(() => [Int])
  @IsNumber({}, { each: true })
  categoriesId: number[];
}
