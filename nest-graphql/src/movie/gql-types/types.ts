import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteMovieDto {
  @Field()
  message: string;
}
