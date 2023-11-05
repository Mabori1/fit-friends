import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TrainingRepository } from '../training/training.repository';
import CreateTrainingDto from './dto/create-training.dto';
import { TrainingEntity } from '../training/training.entity';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { TrainingQuery } from './query/training.query';
import { OrderQuery } from './query/order.query';
import { OrderRepository } from '../order/order.repository';
import { FriendRepository } from '../friend/friend.repository';
import { ITokenPayload, ITotalOrder, IUser } from '@fit-friends/types';
import { UserRepository } from '../user/user.repository';
import { SubscriberRepository } from '../subscriber/subscriber.repository';
import { NotifyService } from '../notify/notify.service';

@Injectable()
export class TrainerRoomService {
  private readonly logger = new Logger(TrainerRoomService.name);

  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly orderRepository: OrderRepository,
    private readonly friendsRepository: FriendRepository,
    private readonly userRepository: UserRepository,
    private readonly notifyService: NotifyService,
    private readonly subscriberRepository: SubscriberRepository,
  ) {}

  async createTraning(payload: ITokenPayload, dto: CreateTrainingDto) {
    const { name, sub } = payload;

    const existsTraining = await this.trainingRepository
      .findByTitle(dto.title)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Training not found');
      });

    if (existsTraining) {
      throw new ConflictException('Training with this title already exists');
    }

    const training = { ...dto, trainerId: sub, feedbacks: [] };
    const trainingEntity = new TrainingEntity(training);

    const subscribers = await this.subscriberRepository.findByTrainerId(sub);

    const newTraining = await this.trainingRepository.create(trainingEntity);

    subscribers.forEach(async (subscriber) => {
      await this.notifyService.addNewTraining({
        trainerName: name,
        title: newTraining.title,
        email: subscriber.email,
        name: subscriber.name,
      });
    });

    return newTraining;
  }

  async update(id: number, trainerId: number, dto: UpdateTrainingDto) {
    const oldTraining = await this.trainingRepository
      .findById(id)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Training not found');
      });

    if (oldTraining) {
      const trainingEntity = new TrainingEntity({
        ...oldTraining,
        ...dto,
      });

      if (oldTraining.trainerId !== trainerId) {
        throw new ForbiddenException('Это не ваша тренировка');
      }

      return await this.trainingRepository.update(id, trainingEntity);
    } else {
      throw new NotFoundException('Training not found');
    }
  }

  public async getTraining(trainingId: number) {
    const training = await this.trainingRepository
      .findById(trainingId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Training not found');
      });

    if (!training) {
      throw new NotFoundException('Training not found');
    }

    return training;
  }

  public async getTrainings(query: TrainingQuery, trainerId: number) {
    const trainings = await this.trainingRepository
      .find(query, trainerId)
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

  public async getTrainingsByTrainerId(trainerId: number) {
    return await this.trainingRepository.findFromTrainer(trainerId);
  }

  public async getOrders(query: OrderQuery, trainerId: number) {
    const orders = await this.orderRepository.find(query, trainerId);

    const totalOrders: ITotalOrder[] = [];
    const tempId = [];
    for (let i = 0; i < orders.length; i++) {
      if (!tempId.includes(orders[i].trainingId)) {
        tempId.push(orders[i].trainingId);
        const training = await this.trainingRepository.findByIdNotFeedback(
          orders[i].trainingId,
        );

        totalOrders.push({
          ...training,
          totalQuantity: orders[i].quantity,
          totalPrice: orders[i].sumPrice,
        });
      } else {
        totalOrders[totalOrders.length - 1].totalQuantity += orders[i].quantity;
        totalOrders[totalOrders.length - 1].totalPrice += orders[i].sumPrice;
      }
    }

    function compareByPrice(a: ITotalOrder, b: ITotalOrder) {
      if (query.sortPrice === 'asc') {
        return a.totalPrice - b.totalPrice;
      } else if (query.sortPrice === 'desc') {
        return b.totalPrice - a.totalPrice;
      }
    }

    function compareByQtt(a: ITotalOrder, b: ITotalOrder) {
      if (query.sortQtt === 'asc') {
        return a.totalQuantity - b.totalQuantity;
      } else if (query.sortQtt === 'desc') {
        return b.totalQuantity - a.totalQuantity;
      }
    }

    return totalOrders.sort(compareByPrice).sort(compareByQtt);
  }

  public async getFriends(friendId: number) {
    const friends = await this.friendsRepository.findByFriendId(friendId);
    const users: IUser[] = [];
    for (let i = 0; i < friends.length; i++) {
      const user = await this.userRepository.findById(friends[i].userId);
      users.push(user);
    }
    return users;
  }
}
