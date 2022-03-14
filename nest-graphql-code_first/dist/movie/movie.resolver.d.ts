import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movie.service';
export declare class MovieResolver {
    private movieService;
    constructor(movieService: MovieService);
    movies(): Promise<import("./dtos/get-movie.dto").GetMovieDto[]>;
    movie(id: number): Promise<import("./dtos/get-movie.dto").GetMovieDto>;
    createMovie(createMovieInput: CreateMovieDto): Promise<Movie>;
    updateMovie(id: number, updateMovieInput: UpdateMovieDto): Promise<Movie>;
    deleteMovie(id: number): Promise<{
        message: string;
    }>;
}
