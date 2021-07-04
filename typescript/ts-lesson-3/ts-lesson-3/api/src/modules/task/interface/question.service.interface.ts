import { DeleteResult } from 'typeorm';
import { createTaskRequestDto } from '../dto/create-task.request.dto';
import { TaskResponseDto } from '../dto/task.response.dto';
import { TasksResponseDto } from '../dto/tasks.response.dto';
import { updateTaskRequestDto } from '../dto/update-task.request.dto';
import { Task } from 'src/database/entities/task.entity';

export interface ITaskService {
  createTask(param: createTaskRequestDto): Promise<{ task: Task }>;
  getTasks(): Promise<{ tasks: Task[] }>;
  findTask(taskId: string): Promise<{ task: Task }>;
  updateTask(
    taskId: string,
    param: updateTaskRequestDto,
  ): Promise<{ task: Task }>;
  deleteTask(taskId: string): Promise<DeleteResult>;
}