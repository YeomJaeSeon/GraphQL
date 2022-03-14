import { Movie } from 'src/movie/entities/movie.entity';
export declare enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}
export declare enum Country {
    SOUTH_KOREA = "SOUTH_KOREA",
    AMERICA = "AMERICA",
    JAPAN = "JAPAN",
    CHINA = "CHINA",
    FRANCE = "FRANCE"
}
export declare class Actor {
    id: number;
    name: string;
    gender: Gender;
    age: number;
    country: Country;
    career: number;
    movies: Movie[];
}
