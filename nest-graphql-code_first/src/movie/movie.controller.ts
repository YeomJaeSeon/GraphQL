import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMovieInput } from './inputs/create-movie.input';
import { UpdateMovieInput } from './inputs/update-movie.input';
import { MovieService } from './movie.service';

@Controller()
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post('movie')
  create(@Body() createMovieDto: CreateMovieInput) {
    return this.movieService.create(createMovieDto);
  }

  @Get('movies')
  findAll() {
    return this.movieService.findAll();
  }

  @Get('movie/:id')
  findById(@Param('id') id: number) {
    return this.movieService.findById(id);
  }

  @Patch('movie/:id')
  update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieInput) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete('movie/:id')
  delete(@Param('id') id: number) {
    return this.movieService.delete(id);
  }
}
