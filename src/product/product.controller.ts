import { ProductDto } from './dto/product.dto';
import { GetAllProductsDto } from './dto/get-all.product.dto';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateCategoryDto } from 'src/category/category.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: GetAllProductsDto) {
    return this.productService.getAll(queryDto)
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productService.byId(+id)
  }

  @Get('similar/:id')
  async getSimilar(@Param('id') id: string) {
    return this.productService.getSimilar(+id)
  }

  @Get('similar/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productService.bySlug(slug)
  }

  @Get('by-category/:categorySlug')
  async getProductByCategory(@Param('categorySlug') categorySlug: string) {
    return this.productService.byCategory(categorySlug)
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async createProduct() {
    return this.productService.create()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(+id, dto)
  }



  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteProduct(@Param('id') productId: string) {
    return this.productService.delete(+productId)
  }
}
