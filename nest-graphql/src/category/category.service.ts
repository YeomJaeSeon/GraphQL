import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(name: string): Promise<Category> {
    const newCategory = this.categoryRepository.create({
      name,
    });

    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findById(id: number): Promise<Category> {
    const foundCategory = await this.categoryRepository.findOne({ id });
    if (!foundCategory) {
      throw new NotFoundException(`#${id}의 카테고리 없음`);
    }
    return foundCategory;
  }
}
