import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleTrainerGuard } from '../auth/guards/role-trainer.guard';
import { IRequestWithTokenPayload } from '@fit-friends/types';
import { OrdersQuery } from './query/order.query';
import { OrderRdo } from './rdo/order.rdo';
import { fillObject } from '@fit-friends/core';
import { RoleClientGuard } from '../auth/guards/role-client.guard';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created.',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Post('/create')
  async createOrder(
    @Body() dto: CreateOrderDto,
    @Req() { user: payload }: IRequestWithTokenPayload,
  ) {
    const newOrder = await this.orderService.create(payload, dto);

    return newOrder;
  }

  @ApiResponse({
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(OrderRdo) },
    },
    status: HttpStatus.OK,
    description: 'Get trainer orders',
  })
  @UseGuards(JwtAuthGuard, RoleTrainerGuard)
  @Get('/trainer-orders')
  async findTrainerOrders(
    @Req() req: IRequestWithTokenPayload,
    @Query() query: OrdersQuery,
  ) {
    const trainerId: number = req?.user.sub;
    const trainerOrders = await this.orderService.getTrainerOrders(
      trainerId,
      query,
    );

    return fillObject(OrderRdo, trainerOrders);
  }

  @ApiResponse({
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(OrderRdo) },
    },
    status: HttpStatus.OK,
    description: 'Get client orders',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Get('/client-orders')
  async findClientOrders(
    @Req() req: IRequestWithTokenPayload,
    @Query() query: OrdersQuery,
  ) {
    const clientId: number = req?.user.sub;
    const clientOrders = await this.orderService.getClientOrders(
      clientId,
      query,
    );

    return fillObject(OrderRdo, clientOrders);
  }
}
