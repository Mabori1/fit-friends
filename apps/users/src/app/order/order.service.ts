import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrder, ITokenPayload } from '@fit-friends/types';
import { OrderQuery } from './query/order.query';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async createOrder(user: ITokenPayload, dto: CreateOrderDto) {
    const { type, trainingId, price, quantity, typeOfPayment } = dto;

    const order: IOrder = {
      type,
      userId: user.sub,
      trainingId,
      price,
      quantity,
      totalPrice: price * quantity,
      typeOfPayment,
      createdAt: new Date(),
    };

    const orderEntity = new OrderEntity(order);

    return await this.orderRepository.create(orderEntity);
  }

  public async getOrder(id: number) {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Order with id - ${id}, not found`);
    }

    return order;
  }

  public async getOrders(query: OrderQuery, trainerId: number) {
    return await this.orderRepository.find(query, trainerId);
  }
}
