import { CategoryService } from './category.service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    create(name: string): Promise<import("./entities/category.entity").Category>;
    findAll(): Promise<import("./entities/category.entity").Category[]>;
    findById(id: number): Promise<import("./entities/category.entity").Category>;
}
