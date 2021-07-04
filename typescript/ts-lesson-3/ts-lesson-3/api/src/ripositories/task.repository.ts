import { Injectable } from '@nestjs/common';
import { Task } from 'src/database/entities/task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { createTaskRequestDto } from '../modules/task/dto/create-task.request.dto';

@Injectable()
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
