import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
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

registerEnumType(Gender, {
  name: 'Gender',
});

registerEnumType(Country, {
  name: 'Country',
});

@Entity()
@ObjectType()
export class Actor {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({
    nullable: true,
    enum: Gender,
  })
  @Field(() => Gender)
  gender: Gender;

  @Column({ nullable: true })
  @Field(() => Int)
  age: number;

  @Column({
    nullable: true,
    enum: Country,
  })
  @Field(() => Country)
  country: Country;

  @Column({
    nullable: true,
  })
  @Field(() => Int)
  career: number;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  @Field(() => [Movie])
  movies: Movie[];
}
