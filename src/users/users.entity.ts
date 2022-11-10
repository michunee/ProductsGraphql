import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/roles/roles.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @ManyToMany(() => Role, { cascade: true })
  @Field(() => [Role])
  @JoinTable({ name: 'user_role' })
  roles: Role[];
}
