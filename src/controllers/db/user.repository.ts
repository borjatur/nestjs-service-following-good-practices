import { CreateUserRequestDto, UpdateUserRequestDto } from 'src/core/dtos/user.dto';
import { User } from 'src/controllers/db/user.entity';
import { UserData } from 'src/core/entities/user.entity';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/core/repositories/user.repo';

@Injectable()
export class UserRepository implements IUserRepository {
  private datasource: DataSource;

  constructor() {
    this.datasource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [User],
      // synchronize: true,
    });
    this.datasource.initialize();
  }

  async findOne(id: number): Promise<UserData> {
    return await this.datasource.getRepository(User).findOne({ where: { id } });
  }

  async find(): Promise<UserData[]> {
    return await this.datasource
      .getRepository(User)
      .find();
  }

  async save(payload: CreateUserRequestDto): Promise<UserData> {
    const user = new User();
    user.username = payload.username;
    user.departmentId = payload.departmentId;
    return await this.datasource.getRepository(User).save(user);
  }

  async update(payload: UpdateUserRequestDto): Promise<UserData> {
    const user = await this.datasource
      .getRepository(User)
      .findOne({ where: { id: payload.id } });
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = { ...user, ...payload };
    return await this.datasource.getRepository(User).save(updatedUser);
  }

  async delete(id: number): Promise<UserData> {
    const user = await this.datasource
      .getRepository(User)
      .findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return await this.datasource.getRepository(User).remove(user);
  }

  async shutdown(): Promise<void> {
    console.log(`Calling destroy as part of userRepository`);
    return this.datasource.destroy();
  }
}