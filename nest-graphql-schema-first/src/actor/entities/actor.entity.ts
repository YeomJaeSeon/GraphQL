import { Movie } from 'src/movie/entities/movie.entity';
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

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('enum', {
    nullable: true,
    enum: Gender,
  })
  gender: Gender;

  @Column({ nullable: true })
  age: number;

  @Column('enum', {
    nullable: true,
    enum: Country,
  })
  country: Country;

  @Column({
    nullable: true,
  })
  career: number;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[];
}
