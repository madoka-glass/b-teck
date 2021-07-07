import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleTag } from 'src/database/entities/article-tag.entity';
import { Tag } from 'src/database/entities/tag.entity';
import { ArticleTagRepository } from 'src/ripositories/article-tag.repository';
import { TagRepository } from 'src/ripositories/tag.repository';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, TagRepository, ArticleTag, ArticleTagRepository])],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
