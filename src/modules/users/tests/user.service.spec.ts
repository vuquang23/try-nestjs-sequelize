import { UserService } from '../user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { UserModel } from '../../../database/models/user.model';

describe('UserService', () => {
  let userService: UserService;
  let userModel: typeof UserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(UserModel),
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
          },
        },
        UserService,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<typeof UserModel>(getModelToken(UserModel));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('UserService testing', () => {
    const input = {
      name: 'le vu quang',
      email: 'quang@gmail.com',
    };

    const output = {
      id: 1,
      ...input,
    };

    it('Create an user successfully', async () => {
      const userModelCreateSpy = jest.spyOn(userModel, 'create');
      userModelCreateSpy.mockResolvedValue(output);
      const createdUser = await userService.create(input);

      expect(userModelCreateSpy).toBeCalledTimes(1);
      expect(userModelCreateSpy).toBeCalledWith(input);
      expect(createdUser).toEqual(output);
    });
  });
});
