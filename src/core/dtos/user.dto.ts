import { IsString, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsNotEmpty()
  public readonly departmentId: number;
}

export class UpdateUserRequestDto {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;

  @IsString()
  @ValidateIf((o) => typeof o.deparmentId === undefined || o.username)
  public readonly username: string;

  @IsNumber()
  @ValidateIf((o) => typeof o.username === undefined || o.departmentId)
  public readonly departmentId: number;
}

export class GetUserByIdRequestDto {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;
}

export class UpdateUserByIdRequestDto {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;

  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly departmentId: number;
}

export class DeleteUserByIdRequestDto {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;
}

export class GetAllUsersDto {
}