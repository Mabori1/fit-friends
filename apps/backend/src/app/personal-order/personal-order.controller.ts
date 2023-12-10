import {
  Controller,
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
import { PersonalOrderRdo } from './rdo/personal-order.rdo';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleClientGuard } from '../auth/guards/role-client.guard';
import { IRequestWithTokenPayload } from '@fit-friends/types';
import { PersonalOrderService } from './personal-order.service';
import { fillObject } from '@fit-friends/core';
import { PersonalOrderStatusQuery } from '../trainer-room/query/personal-order-status.query';

@ApiTags('Personal order')
@Controller('personal-order')
export class PersonalOrderController {
  constructor(private readonly personalOrderService: PersonalOrderService) {}

  @ApiResponse({
    type: PersonalOrderRdo,
    status: HttpStatus.OK,
    description: 'The personal training order successfully created.',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Post(':id')
  public async addPersonalOrder(
    @Param('id') targetId: number,
    @Req() { user: payload }: IRequestWithTokenPayload,
  ) {
    const newPersonalOrder =
      await this.personalOrderService.buyPersonalTraining(
        payload.sub,
        targetId,
      );
    return fillObject(PersonalOrderRdo, newPersonalOrder);
  }

  @ApiResponse({
    type: PersonalOrderRdo,
    status: HttpStatus.OK,
    description: 'The personal training order successfully changed',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/')
  public async approvePersonalOrder(
    @Query() query: PersonalOrderStatusQuery,
    @Req() { user: payload }: IRequestWithTokenPayload,
  ) {
    const personalOrder = await this.personalOrderService.changeStatus(
      payload,
      query,
    );
    return fillObject(PersonalOrderRdo, personalOrder);
  }

  @ApiResponse({
    type: PersonalOrderRdo,
    status: HttpStatus.OK,
    description: 'The personal training order successfully showed',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/in/:id')
  public async getInPersonalOrders(@Param('id') userId: number) {
    const personalOrders =
      await this.personalOrderService.getInPersonalOrders(userId);
    return fillObject(PersonalOrderRdo, personalOrders);
  }

  @ApiResponse({
    type: PersonalOrderRdo,
    status: HttpStatus.OK,
    description: 'The personal training order successfully showed',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/out/:id')
  public async getOutPersonalOrders(@Param('id') userId: number) {
    const personalOrders =
      await this.personalOrderService.getOutPersonalOrders(userId);
    return fillObject(PersonalOrderRdo, personalOrders);
  }
}
