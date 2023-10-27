import { Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { ICRUDRepository, IOrder, OrderQueryDefault } from '@fit-friends/types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrderRepository
{
  constructor(private readonly prisma: PrismaService) {}
