import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/roles.entity';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private rolesRepo: Repository<Role>,
  ) {}

  find() {
    return this.userRepo.find({ relations: { roles: true } });
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id }, relations: { roles: true } });
  }

  async create(user: CreateUserRoleDto) {
    const { email, password } = user;
    const checkUser = await this.userRepo.findOne({
      where: { email: user.email },
    });
    if (checkUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const roles = await Promise.all(
      user.roleName.map((role) => {
        return this.rolesRepo.findOne({ where: { name: role } });
      }),
    );
    const newUser = this.userRepo.create({
      email,
      password: hashedPassword,
      roles,
    });
    return this.userRepo.save(newUser);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepo.remove(user);
  }

  async changePassword(password: string, user: User) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    return this.userRepo.save(user);
  }
}
