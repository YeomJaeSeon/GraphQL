import { ActorEntity } from 'src/actor/entities/actor.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('movie')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  rating: number;

  @Column()
  description: string;

  @ManyToMany(() => ActorEntity, (actor) => actor.movies, { eager: true })
  @JoinTable()
  actors: ActorEntity[];

  //카테고리 하나만 설정가능하다고 가정
  @ManyToOne(() => CategoryEntity, (category) => category.movies, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;
}
