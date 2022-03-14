
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export enum Country {
    SOUTH_KOREA = "SOUTH_KOREA",
    AMERICA = "AMERICA",
    JAPAN = "JAPAN",
    CHINA = "CHINA",
    FRANCE = "FRANCE"
}

export class CreateMovieDto {
    title: string;
    rating: number;
    description: string;
    actorIds: number[];
    categoryId: number;
}

export class UpdateMovieDto {
    title?: Nullable<string>;
    rating?: Nullable<number>;
    description?: Nullable<string>;
}

export class Actor {
    id: number;
    name: string;
    gender: Gender;
    age: number;
    country: Country;
    career: number;
    movies: Movie[];
}

export class Category {
    id: number;
    name: string;
    movies: Movie[];
}

export class Movie {
    id: number;
    title: string;
    rating: number;
    description: string;
    actors: Actor[];
    category: Category;
}

export class DeleteMovieDto {
    message: string;
}

export abstract class IQuery {
    abstract movies(): Movie[] | Promise<Movie[]>;

    abstract movie(id: number): Movie | Promise<Movie>;
}

export abstract class IMutation {
    abstract createMovie(createMovieInput: CreateMovieDto): Movie | Promise<Movie>;

    abstract updateMovie(id: number, updateMovieInput: UpdateMovieDto): Movie | Promise<Movie>;

    abstract deleteMovie(id: number): DeleteMovieDto | Promise<DeleteMovieDto>;
}

type Nullable<T> = T | null;
