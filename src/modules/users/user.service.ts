import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../../database/models/user.model';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserResponseDto } from './dto/response/user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatedUserEvent, UpdatedUserEvent } from 'src/events';
import { DeletedUserEvent } from '../../events/user/deleted-user.event';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    private eventEmitter: EventEmitter2
  ) {}

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

    this.eventEmitter.emit(
      CreatedUserEvent.event,
      new CreatedUserEvent({
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
        },
      })
    );

    return data;
  }

  public async update(updateUserDto: UpdateUserDto) {
    const data = await this.userModel.update(updateUserDto, {
      where: {
        id: updateUserDto.id,
      },
    });

    this.eventEmitter.emit(
      UpdatedUserEvent.event,
      new UpdatedUserEvent({
        user: {
          id: updateUserDto.id,
          email: updateUserDto.email,
          name: updateUserDto.name,
        },
      })
    );

    return data;
  }

  public async remove(id: string) {
    const data = await this.userModel.destroy({ where: { id: id } });

    this.eventEmitter.emit(
      DeletedUserEvent.event,
      new DeletedUserEvent({
        userId: parseInt(id),
      })
    );

    return data;
  }
}
