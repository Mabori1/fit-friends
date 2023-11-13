import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRdo } from '../auth/rdo/user.rdo';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleClientGuard } from '../auth/guards/role-client.guard';
import { ClientRoomService } from './client-room.service';
import { IRequestWithTokenPayload } from '@fit-friends/types';
import { fillObject } from '@fit-friends/core';
import { FriendRdo } from './rdo/friend.rdo';
import { BalanceRdo } from './rdo/balance.rdo';
import { OrderRdo } from '../order/rdo/order.rdo';
import { CreateOrderDto } from './dto/create-order.dto';
import { SubscriberRdo } from './rdo/subscriber.rdo';
import { TrainingRdo } from '../trainer-room/rdo/training.rdo';

@ApiTags('client-room')
@Controller('client')
export class ClientRoomController {
  constructor(private readonly clientRoomService: ClientRoomService) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The friend  has been successfully added.',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Post('friend/:id')
  public async addFriend(
    @Param('id') id: number,
    @Req() { user: payload }: IRequestWithTokenPayload,
  ) {
    const userFriend = await this.clientRoomService.addFriend(payload, id);
    return fillObject(FriendRdo, userFriend);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The friend  has been successfully deleted.',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Delete('friend/:id')
  public async deleteFriend(
    @Param('id') id: number,
    @Req() { user: payload }: IRequestWithTokenPayload,
  ) {
    return await this.clientRoomService.deleteFriend(payload.sub, id);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The friends list obj has been successfully created.',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Get('friends')
  public async getfriends(@Req() { user: payload }: IRequestWithTokenPayload) {
    const users = await this.clientRoomService.showFriends(payload.sub);
    return fillObject(FriendRdo, users);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The friends list users has been successfully created.',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Get('friends-list')
  public async getListfriends(
    @Req() { user: payload }: IRequestWithTokenPayload,
  ) {
    const users = await this.clientRoomService.showMyFriendsList(payload.sub);
    return fillObject(UserRdo, users);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Users training successfully received.',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Get('balance')
  public async getBalance(@Req() { user: payload }: IRequestWithTokenPayload) {
    const userBalance = await this.clientRoomService.showAllBalance(
      payload.sub,
    );
    return fillObject(BalanceRdo, userBalance);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Users training successfully received.',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Get('balance-training/:id')
  public async checkTraining(
    @Param('id') id: number,
    @Req() { user: payload }: IRequestWithTokenPayload,
  ) {
    const userBalance = await this.clientRoomService.showBalance(
      payload.sub,
      id,
    );
    return fillObject(BalanceRdo, userBalance);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users training successfully used.',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Delete('training/:id')
  public async buyTraining(
    @Param('id') id: number,
    @Req() { user: payload }: IRequestWithTokenPayload,
  ) {
    return await this.clientRoomService.spendTraining(payload.sub, id);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'The training successfully ordered.',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Post('order')
  public async makeOrder(
    @Req() { user: payload }: IRequestWithTokenPayload,
    @Body() dto: CreateOrderDto,
  ) {
    const newOrder = await this.clientRoomService.buyTrainings(
      payload.sub,
      dto,
    );
    return fillObject(OrderRdo, newOrder);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'The user recomendation training list successfully created',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Get('recomendations')
  public async getRecomendationTraining(
    @Req() { user: payload }: IRequestWithTokenPayload,
  ) {
    const trainings =
      await this.clientRoomService.createRecomandationList(payload);
    return fillObject(TrainingRdo, trainings);
  }

  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @ApiResponse({
    type: SubscriberRdo,
    status: HttpStatus.OK,
    description: 'Subscribe to the trainer.',
  })
  @Post('/subscribe/:id')
  public async subscribe(
    @Param('id') id: number,
    @Req() { user: payload }: IRequestWithTokenPayload,
  ) {
    const { name, email } = payload;
    await this.clientRoomService.subscribe({ trainerId: id, name, email });

    return fillObject(SubscriberRdo, { trainerId: id, name, email });
  }

  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @ApiResponse({
    type: SubscriberRdo,
    status: HttpStatus.OK,
    description: 'Unsubscribe to the trainer.',
  })
  @Delete('/unsubscribe/:id')
  public async unsubscribe(
    @Param('id') id: number,
    @Req() { user: payload }: IRequestWithTokenPayload,
  ) {
    const { name, email } = payload;
    await this.clientRoomService.unsubscribe({ name, email, trainerId: id });

    return 'Unsubscribe to the trainer.';
  }
}
