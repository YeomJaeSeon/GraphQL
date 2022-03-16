import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteMessage } from 'src/common/models';
import { CreateMovieInput } from './inputs/create-movie.input';
import { UpdateMovieInput } from './inputs/update-movie.input';
import { Movie } from './models/movie.model';
import { MovieService } from './movie.service';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Query(() => [Movie])
  async movies() {
    return this.movieService.findAll();
  }

  @Query(() => Movie)
  async movie(@Args('id', { type: () => Int }) id: number) {
    return this.movieService.findById(id);
  }

  @Mutation(() => Movie)
  async createMovie(
    // @Args('categoryId', { type: () => Int }) cateogryId: number, // @Args('actorIds', { type: () => [Int] }) actorIds: number[], // @Args('description') description: string, // @Args('rating') rating: number, // @Args('title') title: string,
    @Args('createMovieInput') createMovieInput: CreateMovieInput, //이렇게 파라미터가 너무 많을땐 graphql의 input type으로 지정하여 dto를 만들어줄 수 있다.
  ) {
    return this.movieService.create(createMovieInput);
  }

  @Mutation(() => Movie)
  async updateMovie(
    @Args('id', { type: () => Int })
    id: number,
    @Args('updateMovieInput')
    updateMovieInput: UpdateMovieInput,
  ) {
    return this.movieService.update(id, updateMovieInput);
  }

  @Mutation(() => DeleteMessage)
  async deleteMovie(@Args('id', { type: () => Int }) id: number) {
    return await this.movieService.delete(id);
  }
}
