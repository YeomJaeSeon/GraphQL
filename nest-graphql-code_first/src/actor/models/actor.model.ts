import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Movie } from 'src/movie/models/movie.model';
import { Country, Gender } from '../entities/actor.entity';

registerEnumType(Gender, {
  name: 'Gender',
});

registerEnumType(Country, {
  name: 'Country',
});

@ObjectType()
export class Actor {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Gender)
  gender: Gender;

  @Field(() => Int)
  age: number;

  @Field(() => Country)
  country: Country;

  @Field(() => Int)
  career: number;

  @Field(() => [Movie], { nullable: 'itemsAndList' })
  movies?: Movie[];
}
