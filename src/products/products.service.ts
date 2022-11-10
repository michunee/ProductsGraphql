import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/categories.entity';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepo: Repository<Product>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.productsRepo.find({
      relations: { user: true, categories: true },
    });
  }

  find(user: User) {
    return this.productsRepo.find({
      where: { user },
      relations: { user: true, categories: true },
    });
  }

  async create(productData: CreateProductDto, user: User) {
    const { name, price, description } = productData;
    const categories = await Promise.all(
      productData.categoriesId.map((category) => {
        return this.categoriesRepo.findOne({ where: { id: category } });
      }),
    );
    const product = this.productsRepo.create({
      name,
      price,
      description,
      user,
      categories,
    });
    return this.productsRepo.save(product);
  }

  async remove(id: number, user: User) {
    const product = await this.productsRepo.findOne({ where: { id, user } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.productsRepo.remove(product);
  }
}
