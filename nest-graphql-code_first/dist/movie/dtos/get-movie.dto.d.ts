import { Country, Gender } from 'src/actor/entities/actor.entity';
export declare class GetMovieDto {
    id: number;
    title: string;
    rating: number;
    description: string;
    actors: {
        id: number;
        name: string;
        gender: Gender;
        country: Country;
        career: number;
    }[];
    category: {
        id: number;
        name: string;
    };
}
