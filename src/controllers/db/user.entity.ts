import { UserData } from 'src/core/entities/user.entity';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity implements UserData {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', unique: true })
  public username!: string;

  @Column({ type: 'integer' })
  public departmentId!: number;
}