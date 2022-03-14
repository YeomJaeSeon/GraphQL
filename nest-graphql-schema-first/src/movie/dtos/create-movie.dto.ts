export class CreateMovieDto {
  title: string;
  rating: number;
  description: string;
  actorIds: number[];
  categoryId: number;
}
