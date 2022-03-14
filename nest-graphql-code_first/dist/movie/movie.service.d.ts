import { Actor } from 'src/actor/entities/actor.entity';
import { Category } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { GetMovieDto } from './dtos/get-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { Movie } from './entities/movie.entity';
export declare class MovieService {
    private movieRepository;
    private actorRepository;
    private categoryRepository;
    constructor(movieRepository: Repository<Movie>, actorRepository: Repository<Actor>, categoryRepository: Repository<Category>);
    create(createMovieDto: CreateMovieDto): Promise<Movie>;
    findAll(): Promise<GetMovieDto[]>;
    findById(id: number): Promise<GetMovieDto>;
    update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie>;
    delete(id: number): Promise<string>;
    private movie2getMovieDto;
}
