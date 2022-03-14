import { Country, Gender } from '../entities/actor.entity';
export declare class CreateActorDto {
    name: string;
    gender: Gender;
    age: number;
    country: Country;
    career: number;
}
