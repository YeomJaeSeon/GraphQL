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

export interface CreateMovieInput {
    title: string;
    rating: number;
    description: string;
    actorIds: number[];
    categoryId: number;
}

export interface UpdateMovieInput {
    title?: Nullable<string>;
    rating?: Nullable<number>;
    description?: Nullable<string>;
}

export interface Actor {
    id: string;
    name: string;
    gender: Gender;
    age: number;
    country: Country;
    career: number;
    movies?: Nullable<Nullable<Movie>[]>;
}

export interface Category {
    id: string;
    name: string;
    movies?: Nullable<Nullable<Movie>[]>;
}

export interface DeleteMessage {
    message: string;
}

export interface Movie {
    id: string;
    title: string;
    rating: number;
    description: string;
    isGood: boolean;
    actors: Actor[];
    category: Category;
}

export interface IQuery {
    movies(): Movie[] | Promise<Movie[]>;
    movie(id: number): Movie | Promise<Movie>;
}

export interface IMutation {
    createMovie(createMovieInput: CreateMovieInput): Movie | Promise<Movie>;
    updateMovie(id: number, updateMovieInput: UpdateMovieInput): Movie | Promise<Movie>;
    deleteMovie(id: number): DeleteMessage | Promise<DeleteMessage>;
}

type Nullable<T> = T | null;
