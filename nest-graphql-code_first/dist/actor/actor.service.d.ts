import { Repository } from 'typeorm';
import { CreateActorDto } from './dtos/create-actor.dto';
import { Actor } from './entities/actor.entity';
export declare class ActorService {
    private actorRepository;
    constructor(actorRepository: Repository<Actor>);
    create(createActorDto: CreateActorDto): Promise<Actor>;
    findAll(): Promise<Actor[]>;
    findById(id: number): Promise<Actor>;
}
