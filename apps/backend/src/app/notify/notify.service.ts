import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { CreateSubscriberDto } from '../subscriber/dto/create-subscriber.dto';
import {
  IFriendInfo,
  INewTrainingInfo,
  INotify,
  RabbitRouting,
} from '@fit-friends/types';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { NotifyEntity } from './notify.entity';
import { NotifyRepository } from './notify.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class NotifyService {
  private readonly logger = new Logger(NotifyService.name);

  constructor(
    private readonly rabbitClient: AmqpConnection,
    private readonly configService: ConfigService,
    private readonly notifyRepository: NotifyRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async addNewTraining(dto: INewTrainingInfo) {
    await this.rabbitClient.publish<INewTrainingInfo>(
      this.configService.get<string>('rabbit.exchange'),
      RabbitRouting.AddTraining,
      { ...dto },
    );
    const { title, email } = dto;
    const text = `Появилась новая тренировка ${title}`;
    this.makeNewNotify({ targetUserEmail: email, text });
  }

  public async addFriend(dto: IFriendInfo) {
    return this.rabbitClient.publish<IFriendInfo>(
      this.configService.get<string>('rabbit.exchange'),
      RabbitRouting.AddFriend,
      { ...dto },
    );
  }

  public async makeNewNotify(dto: CreateNotifyDto): Promise<INotify> {
    const targetUser = await this.userRepository
      .findByEmail(dto.targetUserEmail)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('User with this id not found');
      });

    if (!targetUser) {
      throw new NotFoundException('User with this id not found');
    }
    const entity = new NotifyEntity({ ...dto });
    return await this.notifyRepository.create(entity);
  }

  public async deleteNotify(notifyId: number): Promise<void> {
    const notify = await this.notifyRepository
      .findById(notifyId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Notify with this id not found');
      });

    if (!notify) {
      throw new NotFoundException('Notify with this id not found');
    }
    await this.notifyRepository.destroy(notifyId);
  }

  public async getNotifyById(id: number): Promise<INotify> {
    return await this.notifyRepository.findById(id);
  }

  public async getNotify(email: string): Promise<INotify> {
    return await this.notifyRepository.findByEmail(email);
  }
}
