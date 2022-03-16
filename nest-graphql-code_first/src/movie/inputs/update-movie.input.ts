import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateMovieInput {
  @Field({ nullable: true })
  title?: string;
  @Field(() => Int, { nullable: true })
  rating?: number;
  @Field({ nullable: true }) // non null (스키마 - 인풋 타입 보면 !이 안 붙은걸 알수있음)
  description?: string;
}
