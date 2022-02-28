import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  HasMany,
  HasOne,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { Optional } from 'sequelize/types';
import { PostModel } from './post.model';

export interface IUserAttribute {
  id: number;
  email: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

@Table({
  tableName: 'users',
})
export class UserModel
  extends Model<IUserAttribute, Optional<IUserAttribute, 'id'>>
  implements IUserAttribute
{
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public email: string;

  @Column
  public name: string;

  @HasMany(() => PostModel)
  public posts: PostModel[];

  @CreatedAt
  @Column
  public createdAt?: Date;

  @UpdatedAt
  @Column
  public updatedAt?: Date;

  @DeletedAt
  @Column
  public deletedAt?: Date;
}
