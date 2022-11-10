import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/roles.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private rolesRepo: Repository<Role>,
    private jwtService: JwtService,
  ) {}

  createAccessToken(user: User) {
    const payload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '5d' });

    return accessToken;
  }

  async signup(user: CreateUserDto) {
    const { email, password } = user;
    const checkUser = await this.userRepo.findOne({
      where: { email: user.email },
    });
    if (checkUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = await this.rolesRepo.findOne({ where: { name: 'user' } });
    if (!userRole) {
      throw new NotFoundException('Role not found');
    }
    const newUser = this.userRepo.create({
      email,
      password: hashedPassword,
      roles: [{ id: userRole.id, name: userRole.name }],
    });
    return this.userRepo.save(newUser);
  }

  async signin(user: CreateUserDto) {
    const { email, password } = user;
    const checkUser = await this.userRepo.findOne({ where: { email } });
    if (!checkUser) {
      throw new NotFoundException('User not found!');
    }
    const isValid = await bcrypt.compare(password, checkUser.password);
    if (!isValid) {
      throw new BadRequestException('Invalid password');
    }
    return checkUser;
  }
}
