import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailDuplication } from './validations/decorators';
import { SearchUserService } from './search-user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, EmailDuplication, SearchUserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
