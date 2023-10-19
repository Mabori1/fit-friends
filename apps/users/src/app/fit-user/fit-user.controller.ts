import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { FitUserService } from './fit-user.service';
import { ApiResponse } from '@nestjs/swagger';
import { UserRdo } from './rdo/user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@fit-friends/util/util-core';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import {
  IRequestWithTokenPayload,
  IRequestWithUser,
  UserRole,
} from '@fit-friends/shared/app-types';
import { UserQuery } from './query/user.query';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserRolesGuard } from './guards/user-roles.guard';
import { Roles } from './decorator/user-roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class FitUserController {
  constructor(private readonly fitUserService: FitUserService) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('/register')
  public async create(@Body() dto: CreateUserDto): Promise<UserRdo> {
    const newUser = await this.fitUserService.createUser(dto);
    return fillObject(UserRdo, newUser);
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: LoginUserDto): Promise<LoggedUserRdo> {
    const verifiedUser = await this.fitUserService.verifyUser(dto);
    const loggedUser = await this.fitUserService.createUserToken(verifiedUser);
    return fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Req() { user }: IRequestWithUser) {
    return this.fitUserService.createUserToken(user);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Users list complete.',
  })
  @Roles(UserRole.Client)
  @UseGuards(UserRolesGuard)
  @Get('/feed')
  public async feedLine(
    @Query(new ValidationPipe({ transform: true })) query: UserQuery
  ) {
    const users = await this.fitUserService.getUsers(query);
    return { ...fillObject(UserRdo, users) };
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User updated.',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  public async update(
    @Req() { user: payload }: IRequestWithTokenPayload,
    @Body() dto: UpdateUserDto
  ) {
    const id = payload.sub;
    const updatedUser = await this.fitUserService.updateUser(id, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User by id received',
  })
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  public async show(@Param('id', ParseIntPipe) id: number) {
    const user = await this.fitUserService.getUser(id);
    return fillObject(UserRdo, user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Checkig token availibility',
  })
  @UseGuards(JwtAuthGuard)
  @Get('check')
  public async checkToken(@Req() { user: payload }: IRequestWithTokenPayload) {
    return payload;
  }
}
