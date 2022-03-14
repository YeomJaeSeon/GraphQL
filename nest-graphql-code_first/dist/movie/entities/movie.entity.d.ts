import { Actor } from 'src/actor/entities/actor.entity';
import { Category } from 'src/category/entities/category.entity';
export declare class Movie {
    id: number;
    title: string;
    rating: number;
    description: string;
    actors: Actor[];
    category: Category;
}
