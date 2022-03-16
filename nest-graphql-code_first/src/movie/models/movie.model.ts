import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Actor } from 'src/actor/models/actor.model';
import { Category } from 'src/category/models/category.model';

@ObjectType()
export class Movie {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  rating: number;

  @Field()
  description: string;

  @Field()
  isGood: boolean;

  @Field(() => [Actor])
  actors: Actor[];

  @Field(() => Category)
  category: Category;

  // == Movie 생성 메서드 == //
  static createMovie(
    id: number,
    title: string,
    rating: number,
    description: string,
    isGood: boolean,
    actors: Actor[],
    category: Category,
  ): Movie {
    const movie = new Movie();
    movie.id = id;
    movie.title = title;
    movie.rating = rating;
    movie.description = description;
    movie.isGood = isGood;
    movie.actors = actors;
    movie.category = category;

    return movie;
  }
}
