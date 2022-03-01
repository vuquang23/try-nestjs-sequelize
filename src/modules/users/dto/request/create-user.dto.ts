import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Validate } from 'class-validator';
import {
  EmailNotDuplicated,
  EmailDuplication,
} from '../../validators/email/email.validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @EmailNotDuplicated()
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
