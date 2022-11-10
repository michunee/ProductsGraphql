import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ManagerGuard } from 'src/guards/manager.guard';
import { Category } from './categories.entity';
import { CategoriesService } from './categories.service';

@Resolver()
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}

  @Query(() => [Category])
  allCategories() {
    return this.categoriesService.find();
  }

  @UseGuards(ManagerGuard)
  @Mutation(() => Category)
  addCategory(@Args('categoryName') categoryName: string) {
    return this.categoriesService.create(categoryName);
  }

  @UseGuards(ManagerGuard)
  @Mutation(() => Category)
  deleteCategory(@Args('categoryId') categoryId: number) {
    return this.categoriesService.delete(categoryId);
  }
}
