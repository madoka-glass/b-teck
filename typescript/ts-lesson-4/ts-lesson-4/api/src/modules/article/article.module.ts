import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleTag } from 'src/database/entities/article-tag.entity';
import { Article } from 'src/database/entities/article.entity';
import { Tag } from 'src/database/entities/tag.entity';
import { ArticleTagRepository } from 'src/ripositories/article-tag.repository';
import { ArticleRepository } from 'src/ripositories/article.repository';
import { TagRepository } from 'src/ripositories/tag.repository';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleRepository, ArticleTag, ArticleTagRepository, Tag, TagRepository])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
