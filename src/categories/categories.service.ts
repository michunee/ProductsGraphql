import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  find() {
    return this.categoryRepo.find();
  }

  async create(name: string) {
    const isExistCategory = await this.categoryRepo.findOne({
      where: { name },
    });
    if (isExistCategory) {
      throw new BadRequestException('Category already exists');
    }
    const category = this.categoryRepo.create({ name });
    return this.categoryRepo.save(category);
  }

  async delete(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.categoryRepo.remove(category);
  }
}
