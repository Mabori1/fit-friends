import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'node:crypto';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { jwtConfig } from '@fit-friends/config/config-users';
import { ConfigType } from '@nestjs/config';
import { IUser, IUserFilter } from '@fit-friends/shared/app-types';
import { FitUserEntity } from './fit-user.entity.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
} from '@fit-friends/shared/app-constants';
import { createJWTPayload } from '@fit-friends/util/util-core';
import { UserQuery } from './query/user.query.js';

@Injectable()
export class FitUserService {
  constructor(
    private readonly fitnessUserRepository: FitUserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {}

  public async createUser(dto: CreateUserDto): Promise<IUser> {
    const fitUser = {
      ...dto,
      passwordHash: '',
      orders: [],
      personalOrders: [],
      userBalance: [],
    };

    const existUser = await this.fitnessUserRepository.findByEmail(dto.email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new FitUserEntity(fitUser).setPassword(
      dto.password
    );
    return await this.fitnessUserRepository.create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.fitnessUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const fitnessUserEntity = new FitUserEntity(existUser);
    if (!(await fitnessUserEntity.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: number) {
    return this.fitnessUserRepository.findById(id);
  }

  public async createUserToken(user: IUser) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID(),
    };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);
    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      }),
    };
  }

  public async getUsers(query: UserQuery): Promise<IUser[] | null> {
    const { limit, page } = query;
    const UserFilter: IUserFilter = { ...query };
    const users = await this.fitnessUserRepository.find(
      limit,
      UserFilter,
      page
    );
    return users;
  }

  public async updateUser(id: number, dto: UpdateUserDto) {
    const oldUser = await this.fitnessUserRepository.findById(id);
    if (oldUser) {
      const userEntity = new FitUserEntity({
        ...oldUser,
        ...dto,
      });
      console.log(oldUser, dto);
      userEntity.createdAt = oldUser.createdAt;
      return await this.fitnessUserRepository.update(id, userEntity);
    }
  }
}
