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
import { ITokenPayload, ITotalOrder } from '@fit-friends/types';
import { PersonalOrderRepository } from '../personal-order/personal-order.repository';
import { PersonalOrderEntity } from '../personal-order/personal-order.entity';

@Injectable()
export class TrainerRoomService {
  private readonly logger = new Logger(TrainerRoomService.name);

  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly orderRepository: OrderRepository,
    private readonly friendsRepository: FriendRepository,
    private readonly personalOrderRepository: PersonalOrderRepository,
  ) {}

  async create(dto: CreateTrainingDto) {
    const existsTraining = await this.trainingRepository.findByTitle(dto.title);
    if (existsTraining) {
      throw new ConflictException('Training with this title already exists');
    }
    const training = { ...dto, feedbacks: [] };
    const trainingEntity = new TrainingEntity(training);

    return await this.trainingRepository.create(trainingEntity);
  }

  async update(id: number, dto: UpdateTrainingDto) {
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
    return await this.trainingRepository.find(query, trainerId);
  }

  async remove(id: number) {
    return await this.trainingRepository.destroy(id);
  }

  public async getOrders(query: OrderQuery, trainerId: number) {
    const orders = await this.orderRepository.find(query, trainerId);

    const totalOrders: ITotalOrder[] = [];
    const tempId = [];
    for (let i = 0; i < orders.length; i++) {
      if (!tempId.includes(orders[i].trainingId)) {
        tempId.push(orders[i].trainingId);
        totalOrders.push({
          ...orders[i],
          totalQtt: orders[i].quantity,
          totalPrice: orders[i].sumPrice,
        });
      } else {
        totalOrders[totalOrders.length - 1].totalQtt += orders[i].quantity;
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
        return a.totalQtt - b.totalQtt;
      } else if (query.sortQtt === 'desc') {
        return b.totalQtt - a.totalQtt;
      }
    }

    return totalOrders.sort(compareByPrice).sort(compareByQtt);
  }

  public async getFriends(userId: number) {
    return await this.friendsRepository.findByUserId(userId);
  }

  public async getPersonalOrder(trainerId: number) {
    return await this.personalOrderRepository.findByTrainerId(trainerId);
  }

  public async changeStatus(
    payload: ITokenPayload,
    { orderId: orderId, newStatus: newStatus },
  ) {
    const order = await this.personalOrderRepository
      .findById(orderId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Order not found');
      });

    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.trainerId !== payload.sub) {
      throw new ForbiddenException('You are not the trainer');
    }

    if (order.orderStatus !== newStatus) {
      const entity = new PersonalOrderEntity({
        ...order,
        orderStatus: newStatus,
      });
      entity.createdAt = order.createdAt;
      await this.personalOrderRepository.update(orderId, entity);
      return await this.personalOrderRepository.findById(orderId);
    }
  }
}
