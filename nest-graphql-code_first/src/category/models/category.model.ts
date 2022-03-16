import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/movie/models/movie.model';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [Movie], { nullable: 'itemsAndList' })
  movies?: Movie[];
}
