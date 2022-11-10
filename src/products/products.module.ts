import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { UsersModule } from 'src/users/users.module';
import { Product } from './products.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [UsersModule, CategoriesModule, TypeOrmModule.forFeature([Product])],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
