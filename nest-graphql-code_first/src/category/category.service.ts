import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(name: string): Promise<CategoryEntity> {
    const newCategory = this.categoryRepository.create({
      name,
    });

    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findById(id: number): Promise<CategoryEntity> {
    const foundCategory = await this.categoryRepository.findOne({ id });
    if (!foundCategory) {
      throw new NotFoundException(`#${id}의 카테고리 없음`);
    }
    return foundCategory;
  }
}
