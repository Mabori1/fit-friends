import { IUser, IUserFilter } from '@fit-friends/types';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { UserQuery } from './query/user.query';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUser(id: number) {
    return this.userRepository.findById(id);
  }

  public async getUsers(query: UserQuery): Promise<IUser[] | null> {
    const { limit, page } = query;
    const userFilter: IUserFilter = { ...query };
    const users = await this.userRepository.find(limit, userFilter, page);
    return users;
  }

  public async updateUser(id: number, dto: UpdateUserDto) {
    const oldUser = await this.userRepository.findById(id);
    if (oldUser) {
      const userEntity = new UserEntity({
        ...oldUser,
        ...dto,
      });
      userEntity.createdAt = oldUser.createdAt;
      return await this.userRepository.update(id, userEntity);
    }
  }
}
