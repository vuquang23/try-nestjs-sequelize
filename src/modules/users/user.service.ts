import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../../database/models/user.model';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}

  public async findAll() {
    const data = await this.userModel.findAll();
    return {
      data: data,
    };
  }

  public async findOne(id: string) {
    const data = await this.userModel.findOne({
      where: {
        id: id,
      },
    });
    return {
      data: data,
    };
  }

  public async create(createUserDto: CreateUserDto) {
    const data = await this.userModel.create(createUserDto);
    return {
      data: data,
    };
  }

  public async update(updateUserDto: UpdateUserDto) {
    const data = await this.userModel.update(updateUserDto, {
      where: {
        id: updateUserDto.id,
      },
    });
    return {
      data: data,
    };
  }

  public async remove(id: string) {
    const data = await this.userModel.destroy({ where: { id: parseInt(id) } });
    return {
      data: data,
    };
  }
}
