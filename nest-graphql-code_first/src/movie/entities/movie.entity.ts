import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Actor } from 'src/actor/entities/actor.entity';
import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field(() => Int)
  rating: number;

  @Column()
  @Field()
  description: string;

  @ManyToMany(() => Actor, (actor) => actor.movies, { eager: true })
  @JoinTable()
  @Field(() => [Actor])
  actors: Actor[];

  //카테고리 하나만 설정가능하다고 가정
  @ManyToOne(() => Category, (category) => category.movies, { eager: true })
  @JoinColumn()
  @Field(() => Category)
  category: Category;
}
