import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { CategoryModule } from './category/category.module';
import { ActorModule } from './actor/actor.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // code first -> graphql schema 자동생성 (typescript class를 통해)
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ottDB',
      entities: ['dist/**/*.entity{.ts,.js}'],
      // synchronize: true,
      logging: true,
    }),
    MovieModule,
    CategoryModule,
    ActorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
