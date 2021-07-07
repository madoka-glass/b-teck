import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository()
export class ArticleRepository {}