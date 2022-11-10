import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductDto } from './dtos/products.dto';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@UseGuards(AuthGuard)
@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @UseGuards(AdminGuard)
  @Query(() => [ProductDto])
  @Serialize(ProductDto)
  allProducts() {
    return this.productsService.findAll();
  }

  @Query(() => [ProductDto])
  @Serialize(ProductDto)
  userProducts(@CurrentUser() user: any) {
    return this.productsService.find(user);
  }

  @Mutation(() => Product)
  createProduct(
    @Args('productData') productData: CreateProductDto,
    @CurrentUser() user: any,
  ) {
    return this.productsService.create(productData, user);
  }

  @Mutation(() => Product)
  deleteProduct(
    @Args('productId') productId: number,
    @CurrentUser() user: any,
  ) {
    return this.productsService.remove(productId, user);
  }
}
