import { Injectable, NotFoundException } from '@nestjs/common';
import { Tag } from 'src/database/entities/tag.entity';
import { ArticleTagRepository } from 'src/ripositories/article-tag.repository';
import { TagRepository } from 'src/ripositories/tag.repository';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    private readonly _tagRepository,
    private readonly _articleTagRepository,
  ) {}
  
  //tag作成処理
  async createTag(param) {
    const newTag = new Tag();
    const newTagParam = this._tagRepository.create({
      ...newTag,
      ...param,
    });
    const tag = await this._tagRepository.save(newTagParam);
    return { tag };
  }

  //tag全件取得処理
  async getTags()  {
    const tags = await this._tagRepository.find();
    if (!tags) throw new NotFoundException();
    return { tags };
  }

  //tag取得処理
  async findTag(taskId) {
    const tag = await this._tagRepository.findOne(taskId);
    if (!tag) throw new NotFoundException();
    return { tag };
  }

  //tag更新処理
  async updateTag(tagId, param) {
    const origin = await this._tagRepository.findOne(tagId);
    if (!origin) throw new NotFoundException();
    const tag = await this._tagRepository.save({ ...origin, ...param });
    return { tag };
  }

  //tag削除処理
  async deleteTag(tagId) {
    const deleteArticleTag = await this._articleTagRepository.delete({ tagId: tagId });

    const result = await this._tagRepository.delete(tagId);

    return result;
  }
}
