import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  HttpStatus,
  Controller,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Query,
  Delete,
  Req,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import {
  refs,
  ApiBody,
  ApiTags,
  ApiHeader,
  ApiResponse,
  ApiConsumes,
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { CreateClientDto } from './dto/client.dto';
import { CreateTrainerDto } from './dto/trainer.dto';
import { TrainerRdo } from './rdo/trainer.rdo';
import { ClientRdo } from './rdo/client.rdo';
import { AuthService } from './auth.service';
import {
  Image,
  IRequestWithUser,
  ITokenPayload,
  UserRole,
} from '@fit-friends/types';
import { fillObject } from '@fit-friends/core';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtRefreshGuard } from '../fit-user/guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserQuery } from '../fit-user/query/user.query';
import { UpdateClientDto } from './dto/update-client.dto';
import { UpdateTrainerDto } from './dto/update-traner.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('users')
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiExtraModels(ClientRdo, TrainerRdo, CreateClientDto, CreateTrainerDto)
  @ApiResponse({
    schema: { anyOf: refs(ClientRdo, TrainerRdo) },
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @ApiBody({ schema: { anyOf: refs(CreateClientDto, CreateTrainerDto) } })
  public async create(@Body() dto: CreateClientDto | CreateTrainerDto) {
    const newUser = await this.authService.register(dto);

    return newUser.role === UserRole.Client
      ? fillObject(ClientRdo, newUser)
      : fillObject(TrainerRdo, newUser);
  }

  @Post('login')
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.verifyUser(dto);
    const tokens = await this.authService.loginUser(user);

    return fillObject(LoggedUserRdo, {
      id: user.id,
      email: user.email,
      role: user.role,
      ...tokens,
    });
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'Tokens has been successfully updated.',
  })
  public async refresh(@Req() { user }: IRequestWithUser) {
    const newTokens = await this.authService.refresh(user);

    return fillObject(LoggedUserRdo, newTokens);
  }

  @Post('/drop')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Refresh token has been successfully dropped.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async drop(@Req() { user }: IRequestWithUser) {
    return await this.authService.drop(user.userId);
  }

  @Get('/friends')
  @ApiExtraModels(ClientRdo, TrainerRdo)
  @ApiResponse({
    schema: {
      type: 'array',
      items: {
        oneOf: [
          { $ref: getSchemaPath(ClientRdo) },
          { $ref: getSchemaPath(TrainerRdo) },
        ],
      },
    },
    status: HttpStatus.OK,
    description: "The user's friends has been successfully found",
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async showFriends(@Req() user: ITokenPayload) {
    const { id, role } = user;
    const friends = await this.authService.getFriends(id, role);

    return friends.map((friend) =>
      friend.role === UserRole.Client
        ? fillObject(ClientRdo, friend)
        : fillObject(TrainerRdo, friend)
    );
  }

  @Post('/friends/req')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The friendship request sent to user',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async requestFriendship(
    @Body() dto: LoginUserDto,
    @Req() user: ITokenPayload
  ) {
    const { id, role } = user;
    await this.authService.reqFriendship(dto, id, role);
  }

  @Post('/friends/accept')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The friendship was accepted',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async acceptFriendship(
    @Body() dto: LoginUserDto,
    @Req() respondentId: number
  ) {
    await this.authService.accFriendship(dto, respondentId);
  }

  @Post('/friends/reject')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The friendship was rejected',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async rejectFriendship(
    @Body() dto: LoginUserDto,
    @Req() respondentId: number
  ) {
    await this.authService.rejFriendship(dto, respondentId);
  }

  @Delete('/friends/delete')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The friend was deleted from friends list',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async deleteFriend(@Body() dto: LoginUserDto, @Req() id: number) {
    await this.authService.delFriend(dto, id);
  }

  @Delete('/alerts')
  @ApiExtraModels(ClientRdo, TrainerRdo)
  @ApiResponse({
    schema: { anyOf: refs(ClientRdo, TrainerRdo) },
    status: HttpStatus.OK,
    description: 'The alerts was deleted',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async deleteAlerts(@Req() id: number) {
    const updatedUser = await this.authService.delAlerts(id);

    return updatedUser.role === UserRole.Client
      ? fillObject(ClientRdo, updatedUser)
      : fillObject(TrainerRdo, updatedUser);
  }

  @Post('/personal-training/req')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Request for personal training sent to user',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async requestPersonalTraining(
    @Body() dto: LoginUserDto,
    @Req() user: ITokenPayload
  ) {
    const { id, role } = user;
    await this.authService.reqPersonalTraining(dto, id, role);
  }

  @Post('/personal-training/accept')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Request for personal training accepted',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async acceptPersonalTraining(
    @Body() dto: LoginUserDto,
    @Req() respondentId: number
  ) {
    await this.authService.accPersonalTraining(dto, respondentId);
  }

  @Post('/personal-training/reject')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Request for personal training rejected',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async rejectPersonalTraining(
    @Body() dto: LoginUserDto,
    @Req() respondentId: number
  ) {
    await this.authService.rejPersonalTraining(dto, respondentId);
  }

  @Get('user/:id')
  @ApiExtraModels(ClientRdo, TrainerRdo, CreateClientDto, CreateTrainerDto)
  @ApiResponse({
    schema: { anyOf: refs(ClientRdo, TrainerRdo) },
    status: HttpStatus.OK,
    description: 'The user has been successfully found.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async show(@Param('id', ParseIntPipe) id: number) {
    const existUser = await this.authService.getUser(id);

    return existUser.role === UserRole.Client
      ? fillObject(ClientRdo, existUser)
      : fillObject(TrainerRdo, existUser);
  }

  @Get('/')
  @ApiExtraModels(ClientRdo, TrainerRdo)
  @ApiResponse({
    schema: {
      type: 'array',
      items: {
        oneOf: [
          { $ref: getSchemaPath(ClientRdo) },
          { $ref: getSchemaPath(TrainerRdo) },
        ],
      },
    },
    status: HttpStatus.OK,
    description: 'The users has been successfully found',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  public async index(
    @Query(new ValidationPipe({ transform: true })) query: UserQuery,
    @Req() user: ITokenPayload
  ) {
    const { role } = user;
    const users = await this.authService.getUsers(query, role);

    return users.map((user) =>
      user.role === UserRole.Client
        ? fillObject(ClientRdo, user)
        : fillObject(TrainerRdo, user)
    );
  }

  @Patch('/')
  @ApiExtraModels(ClientRdo, TrainerRdo, UpdateClientDto, UpdateTrainerDto)
  @ApiResponse({
    schema: { anyOf: refs(ClientRdo, TrainerRdo) },
    status: HttpStatus.OK,
    description: 'The user has been successfully updated.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiBody({ schema: { anyOf: refs(UpdateClientDto, UpdateTrainerDto) } })
  @UseGuards(JwtAuthGuard)
  public async update(
    @Body() dto: UpdateClientDto | UpdateTrainerDto,
    @Req() { user: { userId } }: IRequestWithUser
  ) {
    const updatedUser = await this.authService.updateUser(userId, dto);

    return updatedUser.role === UserRole.Client
      ? fillObject(ClientRdo, updatedUser)
      : fillObject(TrainerRdo, updatedUser);
  }

  @Post('/avatar')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    description: 'Avatar sussessfully uploaded',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  public async uploadAvatar(@Req() { user: { userId } }: IRequestWithUser) {
    const updatedUser = await this.authService.updateUser(userId, {});
    // TODO: доделать загрузку аватарки

    return updatedUser.role === UserRole.Client
      ? fillObject(ClientRdo, updatedUser)
      : fillObject(TrainerRdo, updatedUser);
  }
}
