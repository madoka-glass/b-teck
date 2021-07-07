import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleTag } from 'src/database/entities/article-tag.entity';
import { Article } from 'src/database/entities/article.entity';
import { Tag } from 'src/database/entities/tag.entity';
import { ArticleTagRepository } from 'src/ripositories/article-tag.repository';
import { ArticleRepository } from 'src/ripositories/article.repository';
import { TagRepository } from 'src/ripositories/tag.repository';

@Injectable()
export class ArticleService {
  constructor(
    private readonly _articleRepository,
    private readonly _articleTagRepository,
    private readonly _tagRepository,
  ) { }
  
  //article作成処理
  async createArticle(param) {
    const newArticle = new Article();
    const newArticleParam = this._articleRepository.create({
      ...newArticle,
      ...param
    });
    const article = await this._articleRepository.save(newArticleParam);
    return { article };
  }

  //tagの登録処理
  async joinTag(param) {
    const newArticleTag = new ArticleTag();
    const newArticleTagParam = this._articleTagRepository.create({
      ...newArticleTag,
      ...param
    });
    const articleTag = await this._articleTagRepository.save(newArticleTagParam);

    return { articleTag };
  }

  //Article全件取得
  async getArticles() {
    const articles = [];
    const articlesData = await this._articleRepository.find();

    await Promise.all(articlesData.map(async article => {
      const tags = [];
      const articleTags = await this._articleTagRepository.find({
        where: { articleId: article.id },
      });

      if (articleTags) {
        await Promise.all(articleTags.map(async articleTag => {
          const tag = await this._tagRepository.findOne(articleTag.tagId);
          if (tag) tags.push(tag);
        }));
      }

      articles.push({ article, tags })
    }));

    return { articles };
  }

  //article取得
  async findArticle(articleId) {
    const article = await this._articleRepository.findOne(articleId);
    if (!article) throw new NotFoundException();

    const articleTags = await this._articleTagRepository.find({
      where: { articleId: articleId },
    });

    const tags = [];

    await Promise.all(articleTags.map(async articleTag => {
      const tag = await this._tagRepository.findOne(articleTag.tagId);
      if(tag) tags.push(tag);
    }));

    return { article, tags };
  }

  //article更新処理
  async updateArticle(articleId, param) {
    const origin = await this._articleRepository.findOne(articleId);
    if (!origin) throw new NotFoundException();
    const article = await this._articleRepository.save({
      ...origin,
      ...param,
    });
    return { article };
  }

  //articleに紐づくタグ削除処理
  async releaseTag(articleId, tagId) {
    const result = await this._articleTagRepository.delete({ articleId: articleId, tagId: tagId});

    return result;
  }

  async deleteArticle(articleId) {
    const deleteArticleTag = await this._articleTagRepository.delete({ articleId: articleId });

    const result = await this._articleRepository.delete(articleId);

    return result;
  }
}
