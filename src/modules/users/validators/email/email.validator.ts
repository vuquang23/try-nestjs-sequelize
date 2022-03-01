import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../../user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class EmailDuplication implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.userService.findOneByEmail(value);
    return user !== null;
  }

  defaultMessage(): string {
    return 'Validate failed';
  }
}

export function EmailNotDuplicated(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'EmailNotDuplicated',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailDuplication,
    });
  };
}
