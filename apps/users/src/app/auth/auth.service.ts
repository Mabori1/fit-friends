import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService, ConfigType } from '@nestjs/config';
import * as crypto from 'node:crypto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQuery } from './query/user.query';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
  IUser,
  IUserFilter,
} from '@fit-friends/types';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { createJWTPayload } from '@fit-friends/core';
//import { jwtConfig } from '@fit-friends/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    // @Inject(jwtConfig.KEY)
    // private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly configService: ConfigService,
  ) {}

  public async createUser(dto: CreateUserDto): Promise<IUser> {
    const newUser = {
      ...dto,
      passwordHash: '',
      orders: [],
      personalOrders: [],
      userBalance: [],
    };

    const existUser = await this.userRepository.findByEmail(dto.email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity(newUser).setPassword(dto.password);
    return await this.userRepository.create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);
    if (!(await userEntity.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: number) {
    return this.userRepository.findById(id);
  }

  public async createUserToken(user: IUser) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      token: crypto.randomUUID(),
    };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);
    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.configService.get<string>('JWT_RT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_RT_EXPIRES_IN'),
        // secret: this.jwtOptions.refreshTokenSecret,
        // expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      }),
    };
  }

  public async getUsers(query: UserQuery): Promise<IUser[] | null> {
    const { limit, page } = query;
    const userFilter: IUserFilter = { ...query };
    const users = await this.userRepository.find(limit, userFilter, page);
    return users;
  }

  public async updateUser(id: number, dto: UpdateUserDto) {
    const oldUser = await this.userRepository.findById(id);
    if (oldUser) {
      const userEntity = new UserEntity({
        ...oldUser,
        ...dto,
      });
      userEntity.createdAt = oldUser.createdAt;
      return await this.userRepository.update(id, userEntity);
    }
  }
}
