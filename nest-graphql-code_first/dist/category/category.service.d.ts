import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(name: string): Promise<Category>;
    findAll(): Promise<Category[]>;
    findById(id: number): Promise<Category>;
}
