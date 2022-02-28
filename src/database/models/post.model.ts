import {
  AutoIncrement,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { UserModel } from './user.model';

export interface IPostAttribute {
  id: number;
  userId: number;
  // mediaId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

@Table({
  tableName: 'posts',
})
export class PostModel
  extends Model<IPostAttribute, Optional<IPostAttribute, 'id'>>
  implements IPostAttribute
{
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @ForeignKey(() => UserModel)
  @Column
  public userId: number;

  // @Column
  // public mediaId?: number;

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
