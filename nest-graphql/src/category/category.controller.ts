import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('category')
  create(@Body('name') name: string) {
    return this.categoryService.create(name);
  }

  @Get('categories')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('category/:id')
  findById(@Param('id') id: number) {
    return this.categoryService.findById(id);
  }
}
