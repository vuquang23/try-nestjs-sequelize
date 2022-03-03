import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
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
import { UserResponseDto } from './dto/response';
import { EmailDuplication } from './validations/decorators/can-create-email.validator';
import { SearchUserService } from './search-user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private searchUserService: SearchUserService
  ) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiBadRequestResponse({
    description: 'Get users failed',
  })
  @ApiOkResponse({
    description: 'Get users successfully',
  })
  @Get()
  findAll() {
    return this.searchUserService.findAll();
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
  findOne(@Param('id') id: string) {
    return this.searchUserService.findOne(id);
  }

  @ApiOperation({ summary: 'Create an user' })
  @ApiBadRequestResponse({
    description: 'Create user failed',
  })
  @ApiOkResponse({
    description: 'Create user successfully',
  })
  @UsePipes(ValidationPipe)
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
  @UsePipes(ValidationPipe)
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
