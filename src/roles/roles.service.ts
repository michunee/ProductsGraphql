import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private rolesRepo: Repository<Role>) {}

  findAll() {
    return this.rolesRepo.find();
  }

  async createRole(roleName: string) {
    const isExistRole = await this.rolesRepo.findOne({
      where: { name: roleName },
    });
    if (isExistRole) {
      throw new BadRequestException('Role already exist');
    }
    const role = this.rolesRepo.create({ name: roleName });
    return this.rolesRepo.save(role);
  }
}
