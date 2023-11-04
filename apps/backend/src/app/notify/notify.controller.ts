import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotifyService } from './notify.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IRequestWithTokenPayload } from '@fit-friends/types';
import { fillObject } from '@fit-friends/core';
import { NotifyRdo } from './rdo/notify.rdo';
import { CreateNotifyDto } from './dto/create-notify.dto';

@ApiTags('Notify')
@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async show(@Req() { user: payload }: IRequestWithTokenPayload) {
    const notifications = await this.notifyService.getNotify(payload.sub);
    return fillObject(NotifyRdo, notifications);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async create(
    @Req() { user: payload }: IRequestWithTokenPayload,
    @Body() dto: CreateNotifyDto,
  ) {
    const newNotification = await this.notifyService.addNotify(
      dto,
      payload.sub,
    );
    return fillObject(NotifyRdo, newNotification);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    await this.notifyService.deleteNotify(id);
  }
}
