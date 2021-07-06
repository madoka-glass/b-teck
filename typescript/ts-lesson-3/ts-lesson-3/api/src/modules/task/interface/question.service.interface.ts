import { DeleteResult } from 'typeorm';
import { createTaskRequestDto } from '../dto/create-task.request.dto';
import { TaskResponseDto } from '../dto/task.response.dto';
import { TasksResponseDto } from '../dto/tasks.response.dto';
import { updateTaskRequestDto } from '../dto/update-task.request.dto';

export interface ITaskService {
  createTask(param: createTaskRequestDto): Promise<TaskResponseDto>;
  getTasks(): Promise<TasksResponseDto>;
  findTask(taskId: string): Promise<TaskResponseDto>;
  updateTask(
    taskId: string,
    param: updateTaskRequestDto,
  ): Promise<TaskResponseDto>;
  deleteTask(taskId: string): Promise<DeleteResult>;
}