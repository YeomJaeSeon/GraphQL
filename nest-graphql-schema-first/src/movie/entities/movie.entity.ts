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

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  rating: number;

  @Column()
  description: string;

  @ManyToMany(() => Actor, (actor) => actor.movies, { eager: true })
  @JoinTable()
  actors: Actor[];

  //카테고리 하나만 설정가능하다고 가정
  @ManyToOne(() => Category, (category) => category.movies, { eager: true })
  @JoinColumn()
  category: Category;
}
