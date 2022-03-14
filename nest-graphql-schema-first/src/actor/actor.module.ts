import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorResolver } from './actor.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  providers: [ActorService, ActorResolver],
})
export class ActorModule {}
