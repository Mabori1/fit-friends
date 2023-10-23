import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { fillObject } from '@fit-friends/core';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { IRequestWithTokenPayload, IRequestWithUser, UserRole } from '@fit-friends/types';
import { UserQuery } from './query/user.query';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from './decorator/user-roles.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('/register')
  public async create(@Body() dto: CreateUserDto): Promise<UserRdo> {
    const newUser = await this.authService.createUser(dto);
    return fillObject(UserRdo, newUser);
  }

  @UseGuards(LocalAuthGuard)
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
  public async login(@Req() { user }: IRequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Users list complete.',
  })
  @Roles(UserRole.Client)
  //@UseGuards(UserRolesGuard, JwtAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/feed')
  public async feedLine(@Query(new ValidationPipe({ transform: true })) query: UserQuery) {
    const users = await this.authService.getUsers(query);
    return { ...fillObject(UserRdo, users) };
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User updated.',
  })
  @Patch('/update')
  public async update(@Req() { user: payload }: IRequestWithTokenPayload, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.authService.updateUser(payload.sub, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User by id received',
  })
  @Get(':id')
  public async show(@Param('id') id: number) {
    const user = await this.authService.getUser(id);
    return fillObject(UserRdo, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User has been successfully logged out.',
  })
  async logout(@Req() user: IRequestWithUser) {
    return this.authService.logout(user.user.userId);
  }

  @UseGuards(JwtRefreshGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Req() { user }: IRequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Checkig token availibility',
  })
  @Post('check')
  public async checkToken(@Req() { user: payload }: IRequestWithTokenPayload) {
    return payload;
  }
}
