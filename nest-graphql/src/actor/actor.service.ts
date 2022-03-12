import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActorDto } from './dtos/create-actor.dto';
import { Actor } from './entities/actor.entity';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  async create(createActorDto: CreateActorDto): Promise<Actor> {
    const newActor = this.actorRepository.create(createActorDto);
    return await this.actorRepository.save(newActor);
  }

  async findAll(): Promise<Actor[]> {
    return await this.actorRepository.find();
  }

  async findById(id: number): Promise<Actor> {
    return await this.actorRepository.findOne({ id });
  }
}
