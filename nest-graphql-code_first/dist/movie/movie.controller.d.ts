import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { MovieService } from './movie.service';
export declare class MovieController {
    private movieService;
    constructor(movieService: MovieService);
    create(createMovieDto: CreateMovieDto): Promise<import("./entities/movie.entity").Movie>;
    findAll(): Promise<import("./dtos/get-movie.dto").GetMovieDto[]>;
    findById(id: number): Promise<import("./dtos/get-movie.dto").GetMovieDto>;
    update(id: number, updateMovieDto: UpdateMovieDto): Promise<import("./entities/movie.entity").Movie>;
    delete(id: number): Promise<string>;
}
