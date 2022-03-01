import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../../database/models/user.model';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserResponseDto } from './dto/response/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}

  public async findAll(): Promise<UserResponseDto[]> {
    const data = await this.userModel.findAll();
    if (data === null) {
      return [];
    }

    return data;
  }

  public async findOne(id: string): Promise<UserResponseDto> {
    const data = await this.userModel.findOne({
      where: {
        id: id,
      },
    });
    if (data === null) {
      return new UserResponseDto();
    }
    return data as UserResponseDto;
  }

  public async findOneByEmail(email: string): Promise<UserModel> {
    const data = await this.userModel.findOne({
      where: {
        email: email,
      },
    });
    return data;
  }

  public async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const data = await this.userModel.create(createUserDto);
    return data;
  }

  public async update(updateUserDto: UpdateUserDto) {
    const data = await this.userModel.update(updateUserDto, {
      where: {
        id: updateUserDto.id,
      },
    });
    return data;
  }

  public async remove(id: string) {
    const data = await this.userModel.destroy({ where: { id: id } });
    return data;
  }
}
