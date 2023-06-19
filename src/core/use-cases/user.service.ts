import { Inject } from '@nestjs/common';
import {
  CreateUserRequestDto,
  GetUserByIdRequestDto,
  UpdateUserRequestDto,
  GetAllUsersDto,
  DeleteUserByIdRequestDto,
} from 'src/core/dtos/user.dto';

import { IUserRepository } from 'src/core/repositories/user.repo';
import { UserData } from '../entities/user.entity';

export class UserService {  
  @Inject('IUserRepository') private repository: IUserRepository

  public async getUserById(
    payload: GetUserByIdRequestDto,
  ): Promise<UserData> {
    return await this.repository.findOne(payload.id);
  }

  public async createUser(
    payload: CreateUserRequestDto,
  ): Promise<UserData> {
    return await this.repository.save(payload);
  }

  public async getAllUsers(
    payload: GetAllUsersDto,
  ): Promise<UserData[]> {
    return await this.repository.find();
  }

  public async updateUserById(
    payload: UpdateUserRequestDto,
  ): Promise<UserData> {
    return this.repository.update(payload);
  }

  public async deleteUserById(
    payload: DeleteUserByIdRequestDto,
  ): Promise<void> {
    await this.repository.delete(payload.id);
  }
}
