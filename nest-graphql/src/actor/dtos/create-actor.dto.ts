import { Country, Gender } from '../entities/actor.entity';

export class CreateActorDto {
  name: string;
  gender: Gender;
  age: number;
  country: Country;
  career: number;
}
