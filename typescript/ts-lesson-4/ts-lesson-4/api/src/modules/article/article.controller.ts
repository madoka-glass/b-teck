import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiExtraModels, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiErrorResponse } from 'src/common/decoraters';
import { CreatedResponse, NotFoundResponse, OkResponse, UnAuthorizedResponse } from 'src/common/types/response';
@ApiTags('articles')
@Controller('articles')
@ApiExtraModels(ApiUnauthorizedResponse, NotFoundException)
@ApiErrorResponse(UnAuthorizedResponse)
@ApiErrorResponse(NotFoundResponse) 
export class ArticleController {
  constructor(private readonly _articleService) {}
  
  @Post()
  async createArticle(@Body() param) {
    let responseData;

    responseData = await this._articleService.createArticle(param);

    return new CreatedResponse(responseData);
  }

  @Get()
  async getArticles() {
    let responseData;

    responseData = await this._articleService.getArticles();

    return new OkResponse(responseData);
  }

  @Get(':articleId')
  async findArticle(@Param('articleId') articleId) {
    let responseData;
    
    responseData = await this._articleService.findArticle(articleId);

    return new OkResponse(responseData);
  }

  @Put(':articleId')
  async updateArticle(
    @Param('articleId') articleId,
    @Body() param
  ) {
    let responseData;

    responseData = await this._articleService.updateArticle(articleId, param);

    return new OkResponse(responseData);
  }

  @Delete(':articleId')
  async deleteArticle(@Param('articleId') articleId) {
    let responseData;
    
    responseData = await this._articleService.deleteArticle(articleId);

    return new OkResponse(responseData);
  }

  @Post('tags')
  async joinTag(@Body() param) {
    let responseData;

    responseData = await this._articleService.joinTag(param);

    return new OkResponse(responseData);
  }

  @Delete(':articleId/tags/:tagId')
  async releaseTag(
    @Param('article') articleId,
    @Param('tagId') tagId
  ) {
    let responseData;

    responseData = await this._articleService.releaseTag(articleId, tagId);

    return new OkResponse(responseData);
  }
}
