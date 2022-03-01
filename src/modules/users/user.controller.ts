import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/request';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/response/user.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiBadRequestResponse({
    description: 'Get users failed',
  })
  @ApiOkResponse({
    description: 'Get users successfully',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get specific user' })
  @ApiBadRequestResponse({
    description: 'Get user failed',
  })
  @ApiOkResponse({
    description: 'Get user successfully',
    type: UserResponseDto,
  })
  @ApiParam({ name: 'id', type: String })
  @Get('/:id')
  findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Create an user' })
  @ApiBadRequestResponse({
    description: 'Create user failed',
  })
  @ApiOkResponse({
    description: 'Create user successfully',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Update an user' })
  @ApiBadRequestResponse({
    description: 'Update user failed',
  })
  @ApiOkResponse({
    description: 'Update user successfully',
  })
  @Put()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @ApiOperation({ summary: 'Delete an user' })
  @ApiBadRequestResponse({
    description: 'Delete user failed',
  })
  @ApiOkResponse({
    description: 'Delete user successfully',
  })
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
