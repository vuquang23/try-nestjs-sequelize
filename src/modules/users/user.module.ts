import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailDuplication } from './validators';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, EmailDuplication],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
