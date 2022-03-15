
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

export interface CreateMovieDto {
    title: string;
    rating: number;
    description: string;
    actorIds: number[];
    categoryId: number;
}

export interface UpdateMovieDto {
    title?: Nullable<string>;
    rating?: Nullable<number>;
    description?: Nullable<string>;
}

export interface Actor {
    id: number;
    name: string;
    gender: Gender;
    age: number;
    country: Country;
    career: number;
    movies: Movie[];
}

export interface Category {
    id: number;
    name: string;
    movies: Movie[];
}

export interface Movie {
    id: number;
    title: string;
    rating: number;
    description: string;
    actors: Actor[];
    category: Category;
}

export interface DeleteMovieDto {
    message: string;
}

export interface IQuery {
    movies(): Movie[] | Promise<Movie[]>;
    movie(id: number): Movie | Promise<Movie>;
}

export interface IMutation {
    createMovie(createMovieInput: CreateMovieDto): Movie | Promise<Movie>;
    updateMovie(id: number, updateMovieInput: UpdateMovieDto): Movie | Promise<Movie>;
    deleteMovie(id: number): DeleteMovieDto | Promise<DeleteMovieDto>;
}

type Nullable<T> = T | null;
