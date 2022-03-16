import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMovieInput, UpdateMovieInput } from 'src/graphql';
import { MovieService } from './movie.service';

@Resolver('Movie')
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  // code first는 @Query 데코레이터에 리턴 타입을 지저해주고, @Args인자에 파라미터 타입을 지정해줬지만,
  //schema first는 이미 schema에 해당 쿼리를 정의 했기에, 할 필요가 없다.
  @Query()
  async movies() {
    return this.movieService.findAll();
  }

  @Query()
  async movie(@Args('id') id: number) {
    return this.movieService.findById(id);
  }

  @Mutation()
  async createMovie(
    @Args('createMovieInput') createMovieInput: CreateMovieInput,
  ) {
    return this.movieService.create(createMovieInput);
  }

  @Mutation()
  async updateMovie(
    @Args('id') id: number,
    @Args('updateMovieInput') updateMovieInput: UpdateMovieInput,
  ) {
    return this.movieService.update(id, updateMovieInput);
  }

  @Mutation()
  async deleteMovie(@Args('id') id: number) {
    return await this.movieService.delete(id);
  }
}
