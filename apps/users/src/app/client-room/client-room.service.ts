import { Logger, NotFoundException } from '@nestjs/common';
import { TrainingRepository } from '../training/training.repository';
import { OrderRepository } from '../order/order.repository';
import { FriendRepository } from '../friend/friend.repository';
import { IFriend, ITokenPayload, IUser, OrderStatus } from '@fit-friends/types';
import { UserService } from '../user/user.service';
import { FriendEntity } from '../friend/friend.entity';
import { BalanceRepository } from '../balance/balance.repository';
import { BalanceEntity } from '../balance/balance.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from '../order/order.entity';
import { PersonalOrderEntity } from '../personal-order/personal-order.entity';
import { PersonalOrderRepository } from '../personal-order/personal-order.repository';

export class ClientRoomService {
  private readonly logger = new Logger(ClientRoomService.name);

  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly orderRepository: OrderRepository,
    private readonly friendRepository: FriendRepository,
    private readonly userService: UserService,
    private readonly balanceRepository: BalanceRepository,
    private readonly personalOrderRepository: PersonalOrderRepository,
  ) {}

  public async addFriend(
    payload: ITokenPayload,
    friendId: number,
  ): Promise<IFriend | null> {
    const userId = payload.sub;
    const friend = await this.userService.getUser(friendId).catch((err) => {
      this.logger.error(err);
      throw new NotFoundException('User not found');
    });

    if (!friend) {
      throw new NotFoundException('User not found');
    }

    const isConfirmed = friend.role === payload.role ? true : false;
    const userFrientEntity = new FriendEntity({
      userId,
      friendId,
      isConfirmed,
    });

    return await this.friendRepository.create(userFrientEntity);
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

    return await this.friendRepository.destroy(friend.friendId);
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

  public async showMyFriendsList(userId: number): Promise<IUser[] | null> {
    const userFriends = await this.friendRepository
      .findByUserId(userId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Friends not found');
      });

    if (!userFriends) {
      throw new NotFoundException('Friends not found');
    }

    let friends: IUser[] = [];
    friends = await Promise.all(
      userFriends.map(async (userFriend) => {
        return await this.userService.getUser(userFriend.friendId);
      }),
    );
    return friends;
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

    return await this.balanceRepository.findByUserIdAndTrainingId(
      userId,
      trainerId,
    );
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

    const userBalance = await this.balanceRepository.findByUserIdAndTrainingId(
      userId,
      dto.trainingId,
    );

    if (!training) {
      throw new NotFoundException('Training not found');
    }

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

  public async buyPersonalTraining(userId: number, trainerId: number) {
    const trainer = await this.userService.getUser(trainerId).catch((err) => {
      this.logger.error(err);
      throw new NotFoundException('User not found');
    });

    if (!trainer) {
      throw new NotFoundException('User not found');
    }

    if (userId !== trainerId) {
      const entity = new PersonalOrderEntity({
        userId,
        trainerId,
        orderStatus: OrderStatus.Pending,
      });
      return await this.personalOrderRepository.create(entity);
    }
  }

  public async getPersonalOrder(orderId: number) {
    return await this.personalOrderRepository.findById(orderId);
  }

  public async changeStatus({ orderId: orderId, newStatus: newStatus }) {
    const order = await this.personalOrderRepository
      .findById(orderId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Order not found');
      });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.orderStatus !== newStatus) {
      const entity = new PersonalOrderEntity({
        ...order,
        orderStatus: newStatus,
      });
      entity.createdAt = order.createdAt;
      await this.personalOrderRepository.update(orderId, entity);
      return await this.personalOrderRepository.findByTrainerId(
        order.trainerId,
      );
    }
  }

  public async createRecomandationList(payload: ITokenPayload) {
    const client = await this.userService.getUser(payload.sub).catch((err) => {
      this.logger.error(err);
      throw new NotFoundException('User not found');
    });

    if (!client) {
      throw new NotFoundException('User not found');
    }

    return await this.trainingRepository.findRecomend({
      typesOfTraining: client.typesOfTraining,
      caloriesQtt: client.client.caloryLosingPlanTotal,
      duration: client.client.timeOfTraining,
      levelOfUser: client.level,
    });
  }
}
