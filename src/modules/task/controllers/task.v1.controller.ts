import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { TaskResponse } from '../docs/task.response';
import { TaskShortResponse } from '../docs/task.short.response';
import { TaskCreateDTO } from '../dto/task.create.dto';
import { TaskUpdateDTO } from '../dto/task.update.dto';
import { TaskService } from '../services/task.service';

@ApiTags('Tasks')
@Controller({
  path: 'task',
  version: ['1'],
})
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Auth
  @Post()
  @ApiOperation({
    description: 'Create new task, returns an created object',
    summary: 'Create a new task',
  })
  @ApiResponse({
    description: 'Success',
    status: 201,
    type: TaskResponse,
  })
  public create(@CurrentUser() id: number, @Body() payload: TaskCreateDTO) {
    return this.taskService.createNewTask(payload, id);
  }

  @Auth
  @Get()
  @ApiOperation({
    description: 'Get all tasks',
    summary: 'Returns all tasks for authorized user',
  })
  @ApiResponse({
    description: 'Success',
    status: 200,
    isArray: true,
    type: TaskShortResponse,
  })
  public getAll(@CurrentUser() id: number) {
    return this.taskService.getAllByUserId(id);
  }

  @Auth
  @Get('/:id')
  @ApiOperation({
    description: 'Get task summary',
    summary: 'Returns an task with entire information',
  })
  @ApiResponse({
    description: 'Success',
    status: 200,
    type: TaskResponse,
  })
  public getByTaskId(@Param('id') id: number) {
    return this.taskService.getById(id);
  }

  @Auth
  @Patch('/:id')
  @ApiOperation({
    description: 'Update task',
    summary: 'Returns an task with updated information',
  })
  @ApiResponse({
    description: 'Success',
    status: 200,
    type: TaskResponse,
  })
  @ApiResponse(
    {
      description: 'Wrong owner',
      status: 403,
      schema: {
        description:
          "This error returns when you trying to update not you'r own task",
        properties: {
          statusCode: { type: 'number', example: 403 },
          message: { type: 'string', example: 'You not owner of this task' },
        },
      },
    },
    { overrideExisting: true },
  )
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
  })
  public updateTask(
    @Param('id') id: number,
    @Body() payload: TaskUpdateDTO,
    @CurrentUser() userId: number,
  ) {
    return this.taskService.updateTask(payload, id, userId);
  }

  @Auth
  @Delete('/:id')
  @ApiOperation({
    description: 'Delete task',
    summary: 'Return status code 200 on success',
  })
  @ApiResponse({
    description: 'Deleted',
    status: 200,
  })
  @ApiResponse(
    {
      description: 'Wrong owner',
      status: 403,
      schema: {
        description:
          "This error returns when you trying to delete not you'r own task",
        properties: {
          statusCode: { type: 'number', example: 403 },
          message: { type: 'string', example: 'You not owner of this task' },
        },
      },
    },
    { overrideExisting: true },
  )
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
  })
  public async deleteTask(
    @Param('id') id: number,
    @CurrentUser() userId: number,
  ) {
    await this.taskService.deleteTask(id, userId);
  }
}
