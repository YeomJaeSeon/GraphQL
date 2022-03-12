import { Movie } from 'src/movie/entities/movie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: '기타',
  })
  name: string;

  @OneToMany(() => Movie, (movie) => movie.category)
  movies: Movie[];
}
