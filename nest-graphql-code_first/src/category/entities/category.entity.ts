import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/movie/entities/movie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({
    default: '기타',
  })
  @Field()
  name: string;

  @OneToMany(() => Movie, (movie) => movie.category)
  @Field(() => [Movie])
  movies: Movie[];
}
