import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/categories/categories.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @Field(() => User)
  user: User;

  @ManyToMany(() => Category, { cascade: true })
  @Field(() => [Category])
  @JoinTable({ name: 'product_category' })
  categories: Category[];
}
