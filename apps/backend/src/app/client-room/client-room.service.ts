import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TrainingRepository } from '../training/training.repository';
import { OrderRepository } from '../order/order.repository';
import { FriendRepository } from '../friend/friend.repository';
import { IFriend, ITokenPayload, IUser } from '@fit-friends/types';
import { FriendEntity } from '../friend/friend.entity';
import { BalanceRepository } from '../balance/balance.repository';
import { BalanceEntity } from '../balance/balance.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from '../order/order.entity';
import { UserRepository } from '../user/user.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { NotifyService } from '../notify/notify.service';
import { SubscriberRepository } from '../subscriber/subscriber.repository';
import { SubscriberEntity } from '../subscriber/subscriber.entity';
import { TrainingQuery } from '../trainer-room/query/training.query';

@Injectable()
export class ClientRoomService {
  private readonly logger = new Logger(ClientRoomService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly trainingRepository: TrainingRepository,
    private readonly orderRepository: OrderRepository,
    private readonly friendRepository: FriendRepository,
    private readonly balanceRepository: BalanceRepository,
    private readonly notifyService: NotifyService,
    private readonly subscriberRepository: SubscriberRepository,
  ) {}

  public async addFriend(
    payload: ITokenPayload,
    friendId: number,
  ): Promise<IFriend | null> {
    const userId = payload.sub;

    const friend = await this.userRepository.findById(friendId).catch((err) => {
      this.logger.error(err);
      throw new NotFoundException('User not found');
    });

    if (!friend) {
      throw new NotFoundException('User not found');
    }

    const existsFriend = await this.friendRepository.findByUserIdAndFriendId(
      userId,
      friendId,
    );

    if (friend.userId === userId || userId === friendId || existsFriend) {
      throw new ConflictException(
        'Друг уже существует или вы пытаетесь добавить самого себя',
      );
    }

    const isConfirmed = friend.role === payload.role ? true : false;
    const userFriendEntity = new FriendEntity({
      userId,
      friendId,
      isConfirmed,
    });

    await this.friendRepository.create(userFriendEntity);

    await this.notifyService.addFriend({
      targetEmail: friend.email,
      targetName: friend.name,
      srcName: payload.name,
      srcEmail: payload.email,
    });

    return friend;
  }

  public async deleteFriend(userId: number, friendId: number): Promise<void> {
    const friend = await this.friendRepository
      .findByUserIdAndFriendId(userId, friendId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Friend not found');
      });

    if (!friend) {
      throw new NotFoundException('Friend not found');
    }

    return await this.friendRepository.destroy(friend.id);
  }

  public async showFriends(userId: number): Promise<IFriend[] | null> {
    const friends = await this.friendRepository
      .findByUserId(userId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Friends not found');
      });

    if (!friends) {
      throw new NotFoundException('Friends not found');
    }

    return friends;
  }

  public async getFriends(userId: number) {
    const friends = await this.friendRepository.findByUserId(userId);
    const users: IUser[] = [];
    for (let i = 0; i < friends.length; i++) {
      const user = await this.userRepository.findById(friends[i].userId);
      users.push(user);
    }
    return users;
  }

  public async showBalance(userId: number, trainerId: number) {
    const training = await this.trainingRepository
      .findById(trainerId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Training not found');
      });

    if (!training) {
      throw new NotFoundException('Training not found');
    }

    const balance = await this.balanceRepository.findByUserIdAndTrainingId(
      userId,
      trainerId,
    );

    if (!balance) {
      throw new NotFoundException('Balance not found');
    }

    return balance;
  }

  public async showAllBalance(userId: number) {
    const balances = await this.balanceRepository.findByUserId(userId);

    if (!balances) {
      throw new NotFoundException('Balance not found');
    }

    return balances;
  }

  public async spendTraining(userId: number, trainingId: number) {
    const userBalance = await this.balanceRepository
      .findByUserIdAndTrainingId(userId, trainingId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Balance not found');
      });

    if (!userBalance) {
      throw new NotFoundException('Balance not found');
    }

    if (userBalance.trainingQtt === 1) {
      await this.balanceRepository.destroy(userBalance.id);
      return null;
    }

    const newBalance = new BalanceEntity({ ...userBalance });
    newBalance.trainingQtt--;
    return await this.balanceRepository.update(userBalance.id, newBalance);
  }

  public async buyTrainings(userId: number, dto: CreateOrderDto) {
    const training = await this.trainingRepository
      .findById(dto.trainingId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Training not found');
      });

    if (!training) {
      throw new NotFoundException('Training not found');
    }

    const userBalance = await this.balanceRepository.findByUserIdAndTrainingId(
      userId,
      dto.trainingId,
    );

    if (userBalance) {
      userBalance.trainingQtt += dto.quantity;
      const balanceEntity = new BalanceEntity({ ...userBalance });
      await this.balanceRepository.update(userBalance.id, balanceEntity);
    } else {
      const balanceEntity = new BalanceEntity({
        userId,
        trainingId: dto.trainingId,
        trainingQtt: dto.quantity,
      });
      await this.balanceRepository.create(balanceEntity);
    }

    const orderEntity = new OrderEntity({ ...dto, userId });
    return await this.orderRepository.create(orderEntity);
  }

  public async getTrainingsRecomended(query: TrainingQuery) {
    const trainings = await this.trainingRepository
      .findRecomended(query)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Training not found');
      });

    if (!trainings) {
      throw new NotFoundException('Trainings not found');
    }

    return trainings;
  }

  async remove(id: number) {
    return await this.trainingRepository.destroy(id);
  }

  public async subscribe(dto: CreateSubscriberDto) {
    const subscriber = await this.subscriberRepository
      .findByEmailAndTrainerId(dto.email, dto.trainerId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Subscriber not found');
      });

    if (subscriber) {
      await this.notifyService.deleteSubscribe(subscriber);
      await this.subscriberRepository.destroy(subscriber.id);
      return false;
    }

    const subscriberEntity = new SubscriberEntity(dto);
    const newSubscriber =
      await this.subscriberRepository.create(subscriberEntity);

    await this.notifyService.addSubscribe(newSubscriber);
    return true;
  }

  public async checkSubscribe(dto: CreateSubscriberDto) {
    const subscriber = await this.subscriberRepository
      .findByEmailAndTrainerId(dto.email, dto.trainerId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Subscriber not found');
      });

    if (subscriber) {
      return true;
    }

    return false;
  }
}
