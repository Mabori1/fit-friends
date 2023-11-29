import { IUser, IUserFilter } from '@fit-friends/types';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { UserQuery } from './query/user.query';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly prisma: PrismaService,
  ) {}

  public async getUser(id: number) {
    const user = await this.userRepository.findById(id).catch((err) => {
      this.logger.error(err);
      throw new NotFoundException('User not found');
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async getUsers(query: UserQuery): Promise<IUser[] | null> {
    const { limit, page } = query;
    const userFilter: IUserFilter = { ...query };
    const users = await this.userRepository
      .find(limit, userFilter, page)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Users not found');
      });

    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  public async updateUser(id: number, dto: UpdateUserDto) {
    const oldUser = await this.userRepository.findById(id).catch((err) => {
      this.logger.error(err);
      throw new NotFoundException('User not found');
    });

    if (oldUser) {
      const userEntity = new UserEntity({
        ...oldUser,
        ...dto,
      });
      userEntity.createdAt = oldUser.createdAt;

      return await this.userRepository.update(id, userEntity);
    }
  }

  public async deleteCertificate(userId: number, path: string) {
    const user = await this.userRepository.findById(userId).catch((err) => {
      this.logger.error(err);
      throw new NotFoundException('User not found');
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const oldCertificates = user.trainer.certificate;
    const newCertificates = oldCertificates.filter((el) => el !== path);
    await this.prisma.user.update({
      where: {
        userId,
      },
      data: {
        trainer: {
          update: {
            certificate: newCertificates,
          },
        },
      },
    });
  }
}
