import { MovieEntity } from 'src/movie/entities/movie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: '기타',
  })
  name: string;

  @OneToMany(() => MovieEntity, (movie) => movie.category)
  movies: MovieEntity[];
}
