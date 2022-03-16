import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field()
  title: string;
  @Field(() => Int)
  rating: number;
  @Field()
  description: string;
  @Field(() => [Int])
  actorIds: number[];
  @Field(() => Int)
  categoryId: number;
}
