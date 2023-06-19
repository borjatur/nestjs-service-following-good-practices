import { Controller, Inject, Post, Get, Delete, Put, Param, Body } from '@nestjs/common';
import {
  CreateUserRequestDto,
  UpdateUserByIdRequestDto,
  GetAllUsersDto,
} from 'src/core/dtos/user.dto';
import { UserData } from 'src/core/entities/user.entity';
import { UserService } from 'src/core/use-cases/user.service';

@Controller('users')
export class UserController {
  @Inject(UserService) private readonly service: UserService;

  @Post()
  private createUser(
    @Body() payload: CreateUserRequestDto,
  ): Promise<UserData> {
    //TODO unique constraint failed user.username
    return this.service.createUser(payload);
  }

  @Get('/:id')
  private getUserById(
    @Param('id') id: number
  ): Promise<UserData> {
    return this.service.getUserById({ id });
  }

  @Get()
  private getAllUsers(
    payload: GetAllUsersDto,
  ): Promise<UserData[]> {
    return this.service.getAllUsers(payload);
  }

  @Put('/:id')
  private updateUserById(
    @Param('id') id: number,
    @Body() payload: UpdateUserByIdRequestDto,
  ): Promise<UserData> {
    return this.service.updateUserById({ id, ...payload });
  }

  @Delete('/:id')
  private deleteUserById(
    @Param('id') id: number,
  ): Promise<void> {
    return this.service.deleteUserById({ id });
  }
}
