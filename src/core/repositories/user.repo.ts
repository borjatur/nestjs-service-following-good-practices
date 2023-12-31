import { UserData } from 'src/core/entities/user.entity';
import { CreateUserRequestDto, UpdateUserRequestDto } from 'src/core/dtos/user.dto';

export interface IUserRepository {
  findOne(id: number): Promise<UserData>;
  save(payload: CreateUserRequestDto): Promise<UserData>;
  delete(id: number): Promise<UserData>;
  update(payload: UpdateUserRequestDto): Promise<UserData>;
  find(): Promise<UserData[]>;
}