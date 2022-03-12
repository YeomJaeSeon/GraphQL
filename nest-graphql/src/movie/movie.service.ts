import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/actor/entities/actor.entity';
import { Category } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dtos/create-movie.dto';
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

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async findById(id: number): Promise<Movie> {
    return await this.movieRepository.findOne({ id });
  }
}
