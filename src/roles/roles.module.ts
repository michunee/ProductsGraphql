import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesResolver, RolesService],
  exports: [RolesService, TypeOrmModule],
})
export class RolesModule {}
