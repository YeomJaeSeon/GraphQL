import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum Country {
  SOUTH_KOREA = 'SOUTH_KOREA',
  AMERICA = 'AMERICA',
  JAPAN = 'JAPAN',
  CHINA = 'CHINA',
  FRANCE = 'FRANCE',
}

@Entity('actor')
export class ActorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
    enum: Gender,
  })
  gender: Gender;

  @Column({ nullable: true })
  age: number;

  @Column({
    nullable: true,
    enum: Country,
  })
  country: Country;

  @Column({
    nullable: true,
  })
  career: number;

  @ManyToMany(() => MovieEntity, (movie) => movie.actors)
  movies: MovieEntity[];
}
