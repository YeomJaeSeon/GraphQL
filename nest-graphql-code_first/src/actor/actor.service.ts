import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActorDto } from './dtos/create-actor.dto';
import { ActorEntity } from './entities/actor.entity';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private actorRepository: Repository<ActorEntity>,
  ) {}

  async create(createActorDto: CreateActorDto): Promise<ActorEntity> {
    const newActor = this.actorRepository.create(createActorDto);
    return await this.actorRepository.save(newActor);
  }

  async findAll(): Promise<ActorEntity[]> {
    return await this.actorRepository.find();
  }

  async findById(id: number): Promise<ActorEntity> {
    const foundActor = await this.actorRepository.findOne({ id });
    if (!foundActor) {
      throw new NotFoundException(`#${id}의 배우 없음`);
    }
    return foundActor;
  }
}
