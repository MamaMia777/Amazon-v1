import { CreateCategoryDto } from './category.dto';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from 'src/user/user.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }



  @Get()
  async getAll() {
    return this.categoryService.getAll()
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.categoryService.bySlug(slug)
  }

  @Get(':id')
  @Auth()
  async getById(@Param('id') id: string) {
    return this.categoryService.byId(+id)
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(@Param('id') categoryId: string, @Body() dto: CreateCategoryDto) {
    return this.categoryService.update(+categoryId, dto)
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create() {
    return this.categoryService.create()
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') categoryId: string) {
    return this.categoryService.delete(+categoryId)
  }

}
