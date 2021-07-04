import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createTaskRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  title!: string;

  @ApiProperty()
  status: number;
}
