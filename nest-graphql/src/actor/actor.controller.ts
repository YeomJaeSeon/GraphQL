import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dtos/create-actor.dto';

@Controller()
export class ActorController {
  constructor(private actorService: ActorService) {}

  @Post('actor')
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  @Get('actors')
  findAll() {
    return this.actorService.findAll();
  }

  @Get('actor/:id')
  findById(@Param('id') id: number) {
    return this.actorService.findById(id);
  }
}
