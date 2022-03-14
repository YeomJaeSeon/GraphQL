import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/actor/entities/actor.entity';
import { Category } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { GetMovieDto } from './dtos/get-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, rating, description, actorIds, categoryId } = createMovieDto;

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

    return await this.movieRepository.save(newMovie);
  }

  async findAll(): Promise<GetMovieDto[]> {
    const foundMovies = await this.movieRepository.find();

    const getMovieDtos = foundMovies.map((foundMovie) =>
      this.movie2getMovieDto(foundMovie),
    );
    return getMovieDtos;
  }

  async findById(id: number): Promise<GetMovieDto> {
    const foundMovie = await this.movieRepository.findOne({ id });
    if (!foundMovie) {
      throw new NotFoundException(`#${id}의 영화 없음`);
    }

    return this.movie2getMovieDto(foundMovie);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const foundMovie = await this.movieRepository.findOne({ id });

    if (!foundMovie) {
      throw new NotFoundException(`#${id}의 영화 없음`);
    }

    const { title, rating, description } = updateMovieDto;

    if (title) foundMovie.title = title;
    if (rating) foundMovie.rating = rating;
    if (description) foundMovie.description = description;

    return await this.movieRepository.save(foundMovie);
  }

  async delete(id: number): Promise<string> {
    const result = await this.movieRepository.delete(id);
    if (result.affected !== 1) {
      throw new NotFoundException(`#${id}의 영화 없음`);
    }

    return 'DELETE SUCCESS';
  }

  // movie entity to responseDto
  private movie2getMovieDto(foundMovie: Movie): GetMovieDto {
    const getActorDto = foundMovie.actors.map((actor) => {
      return {
        id: actor.id,
        name: actor.name,
        gender: actor.gender,
        country: actor.country,
        career: actor.career,
      };
    });

    return {
      id: foundMovie.id,
      title: foundMovie.title,
      rating: foundMovie.rating,
      description: foundMovie.description,
      actors: getActorDto,
      category: {
        id: foundMovie.category.id,
        name: foundMovie.category.name,
      },
    };
  }
}
