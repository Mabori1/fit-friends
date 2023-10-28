import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
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
import { FriendRdo } from './rdo/Frend.rdo';
import { BalanceRdo } from './rdo/balance.rdo';
import { OrderRdo } from '../order/rdo/order.rdo';
import { CreateOrderDto } from './dto/create-order.dto';
import { PersonalOrderRdo } from './rdo/personal-order.rdo';
import { TrainingRdo } from '../training/rdo/training.tdo';
import { PersonalOrderStatusQuery } from './query/personal-order-status.query';

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
    description: 'The friends list obj  has been successfully created.',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Get('friend')
  public async getfriends(@Req() { user: payload }: IRequestWithTokenPayload) {
    const users = await this.clientRoomService.showFriends(payload.sub);
    return fillObject(FriendRdo, users);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Users training successfully received.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('traning/:id')
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
  @Delete('traning/:id')
  public async buyTraning(
    @Param('id') id: number,
    @Req() { user: payload }: IRequestWithTokenPayload,
  ) {
    return await this.clientRoomService.spendTraning(payload.sub, id);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'The training successfully ordered.',
  })
  @UseGuards(JwtAuthGuard)
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
    type: PersonalOrderRdo,
    status: HttpStatus.OK,
    description: 'The personal training order successfully created.',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Post('personal-order/:id')
  public async addPersonalOrder(
    @Param('id') trainerId: number,
    @Req() { user: payload }: IRequestWithTokenPayload,
  ) {
    const newPersonalOrder = await this.clientRoomService.buyPersonalTraining(
      payload.sub,
      trainerId,
    );
    return fillObject(PersonalOrderRdo, newPersonalOrder);
  }

  @ApiResponse({
    type: PersonalOrderRdo,
    status: HttpStatus.OK,
    description: 'The personal training order successfully showed',
  })
  @UseGuards(JwtAuthGuard)
  @Get('personal-order/:id')
  public async checkPersonalOrder(@Param('id') orderId: number) {
    const personalOrder = await this.clientRoomService.getPersonalOrder(
      orderId,
    );
    return fillObject(PersonalOrderRdo, personalOrder);
  }

  @ApiResponse({
    type: PersonalOrderRdo,
    status: HttpStatus.OK,
    description: 'The personal training order successfully changed',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('personal-order')
  public async aproovePersonalOrder(
    @Query()
    query: PersonalOrderStatusQuery,
  ) {
    const personalOrder = await this.clientRoomService.changeStatus(query);
    return fillObject(PersonalOrderRdo, personalOrder);
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
    const trainings = await this.clientRoomService.createRecomandationList(
      payload,
    );
    return fillObject(TrainingRdo, trainings);
  }
}
