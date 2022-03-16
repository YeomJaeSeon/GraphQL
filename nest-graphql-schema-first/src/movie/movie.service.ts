import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import {
  CreateMovieInput,
  DeleteMessage,
  Movie,
  UpdateMovieInput,
} from 'src/graphql';
import { Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private actorRepository: Repository<ActorEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  // == 생성 == //
  async create(createMovieInput: CreateMovieInput): Promise<Movie> {
    const { title, rating, description, actorIds, categoryId } =
      createMovieInput;

    const newMovie = this.movieRepository.create({
      title,
      rating,
      description,
    });

    const foundActors = await this.actorRepository
      .createQueryBuilder('actor')
      .whereInIds(actorIds)
      .getMany();

    if (actorIds.length !== foundActors.length) {
      const excludedIds = actorIds.filter(
        (id) => !foundActors.map((actor) => actor.id).includes(id),
      );
      throw new NotFoundException(`#${excludedIds}의 배우들 없음`);
    }

    const foundCategory = await this.categoryRepository.findOne({
      id: categoryId,
    });
    if (!foundCategory) {
      throw new NotFoundException(`#${categoryId}의 카테고리 없음`);
    }

    newMovie.actors = foundActors;
    newMovie.category = foundCategory;

    const savedMovieEntity = await this.movieRepository.save(newMovie);

    return this.movieEntity2Movie(savedMovieEntity);
  }

  // == 모두 조회 == //
  async findAll(): Promise<Movie[]> {
    const foundMovieEntities = await this.movieRepository.find();

    const movies = foundMovieEntities.map((foundMovie) =>
      this.movieEntity2Movie(foundMovie),
    );

    return movies;
  }

  // == 하나 조회 == //
  async findById(id: number): Promise<Movie> {
    const foundMovieEntity = await this.movieRepository.findOne({ id });
    if (!foundMovieEntity) {
      throw new NotFoundException(`#${id}의 영화 없음`);
    }

    return this.movieEntity2Movie(foundMovieEntity);
  }

  // == 수정 == //
  async update(id: number, updateMovieInput: UpdateMovieInput): Promise<Movie> {
    const foundMovieEntity = await this.movieRepository.findOne({ id });

    if (!foundMovieEntity) {
      throw new NotFoundException(`#${id}의 영화 없음`);
    }

    const { title, rating, description } = updateMovieInput;

    if (title) foundMovieEntity.title = title;
    if (rating) foundMovieEntity.rating = rating;
    if (description) foundMovieEntity.description = description;

    const updatedMovieEntity = await this.movieRepository.save(
      foundMovieEntity,
    );

    return this.movieEntity2Movie(updatedMovieEntity);
  }

  // == 삭제 == //
  async delete(id: number): Promise<DeleteMessage> {
    const result = await this.movieRepository.delete(id);
    if (result.affected !== 1) {
      throw new NotFoundException(`#${id}의 영화 없음`);
    }

    return { message: 'DELETE SUCCESS' };
  }

  // movie entity to movie graphql object type
  private movieEntity2Movie(foundMovie: MovieEntity): Movie {
    return {
      id: String(foundMovie.id),
      title: foundMovie.title,
      rating: foundMovie.rating,
      description: foundMovie.description,
      isGood: foundMovie.rating > 3 ? true : false,
      actors: foundMovie.actors.map((actor) => {
        return {
          id: String(actor.id),
          name: actor.name,
          gender: actor.gender,
          age: actor.age,
          country: actor.country,
          career: actor.career,
        };
      }),
      category: {
        id: String(foundMovie.category.id),
        name: foundMovie.category.name,
      },
    };
  }
}
