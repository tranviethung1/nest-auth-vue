import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity])],
    providers: [ PostsService],
    controllers: [PostsController],
    exports: [PostsService],
  })
export class PostsModule {}
