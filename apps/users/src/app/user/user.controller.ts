import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRdo } from '../auth/rdo/user.rdo';
import { IRequestWithTokenPayload } from '@fit-friends/types';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserQuery } from './query/user.query';
import { fillObject } from '@fit-friends/core';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { RoleClientGuard } from '../auth/guards/role-client.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Users list complete.',
  })
  @UseGuards(JwtAuthGuard, RoleClientGuard)
  @Get('/feed')
  public async feedLine(@Query() query: UserQuery) {
    const users = await this.userService.getUsers(query);
    return fillObject(UserRdo, users);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User by id received',
  })
  @Get(':id')
  public async show(@Param('id') id: number) {
    const user = await this.userService.getUser(id);
    return fillObject(UserRdo, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User updated.',
  })
  @Patch('/update')
  public async update(
    @Req() { user: payload }: IRequestWithTokenPayload,
    @Body() dto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(payload.sub, dto);
    return fillObject(UserRdo, updatedUser);
  }
}
