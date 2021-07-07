import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiExtraModels, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/common/decoraters';
import { CommonResponse, CreatedResponse, NotFoundResponse, OkResponse, UnAuthorizedResponse } from 'src/common/types/response';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
@ApiExtraModels(ApiUnauthorizedResponse, NotFoundException)
@ApiErrorResponse(UnAuthorizedResponse)
@ApiErrorResponse(NotFoundResponse)  
export class UserController {
  constructor(private readonly _userService) {}
  
  @Post()
  async createUser(@Body() param)  {
    let responseData;

    responseData = await this._userService.createUser(param);

    return new CreatedResponse(responseData);
  }

  @Get()
  async getUsers(): Promise<CommonResponse> {
    let responseData;

    responseData = await this._userService.getUsers();

    return new OkResponse(responseData);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId) {
    let responseData;

    responseData = await this._userService.findUser(userId);

    return new OkResponse(responseData);
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId,
    @Body() param
  ) {
    let responseData;

    responseData = await this._userService.updateUser(userId, param);

    return new OkResponse(responseData);
  }
}
