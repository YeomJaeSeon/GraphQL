import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteMessage {
  @Field()
  message: string;
}
