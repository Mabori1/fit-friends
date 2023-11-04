import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { NotifyRepository } from './notify.repository';
import { INotify } from '@fit-friends/types';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { NotifyEntity } from './notify.entity';

@Injectable()
export class NotifyService {
  private readonly logger = new Logger(NotifyService.name);

  constructor(
    private readonly notifyRepository: NotifyRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async getNotify(userId: number): Promise<INotify[]> {
    return await this.notifyRepository.findByUserId(userId);
  }

  public async addNotify(
    dto: CreateNotifyDto,
    srcUserId: number,
  ): Promise<INotify> {
    const targetUser = await this.userRepository
      .findById(dto.targetUserId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('User with this id not found');
      });

    if (!targetUser) {
      throw new NotFoundException('User with this id not found');
    } else {
      const entity = new NotifyEntity({ ...dto, srcUserId });
      return await this.notifyRepository.create(entity);
    }
  }

  public async deleteNotify(id: number): Promise<void> {
    const notify = await this.notifyRepository.findById(id).catch((err) => {
      this.logger.error(err);
      throw new NotFoundException('Notification with this id not found');
    });

    if (!notify) {
      throw new NotFoundException('Notification with this id not found');
    }

    await this.notifyRepository.destroy(id);
  }
}
