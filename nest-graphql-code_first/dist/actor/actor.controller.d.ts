import { ActorService } from './actor.service';
import { CreateActorDto } from './dtos/create-actor.dto';
export declare class ActorController {
    private actorService;
    constructor(actorService: ActorService);
    create(createActorDto: CreateActorDto): Promise<import("./entities/actor.entity").Actor>;
    findAll(): Promise<import("./entities/actor.entity").Actor[]>;
    findById(id: number): Promise<import("./entities/actor.entity").Actor>;
}
