import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { MovieEntity } from './entities/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, ActorEntity, CategoryEntity]),
  ],
  controllers: [MovieController],
  providers: [MovieService, MovieResolver],
})
export class MovieModule {}
