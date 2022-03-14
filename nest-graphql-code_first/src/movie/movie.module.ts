import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from 'src/actor/entities/actor.entity';
import { Category } from 'src/category/entities/category.entity';
import { Movie } from './entities/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Actor, Category])],
  controllers: [MovieController],
  providers: [MovieService, MovieResolver],
})
export class MovieModule {}
