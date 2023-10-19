import * as dayjs from 'dayjs';
import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthErrorMessage, IUser, UserRole } from '@fit-friends/types';
import { CreateClientDto } from './dto/client.dto';
import { CreateTrainerDto } from './dto/trainer.dto';

@Injectable()
export class AuthService {
  constructor(
    //private readonly clientRepository: ClientRepository,
    //private readonly trainerRepository: TrainerRepository,
    // private readonly nutritionDiaryRepository: NutritionDiaryRepository,
    // private readonly trainingDiaryRepository: TrainingDiaryRepository,
    // private readonly clientBalanceRepository: ClientBalanceRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async register(dto: CreateClientDto | CreateTrainerDto) {
    const { email, name, passwordHash, gender, role, location } = dto;

    const existUser =
      role === UserRole.Client
        ? await this.clientRepository.findByEmail(email)
        : await this.trainerRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthErrorMessage.UserAlreadyExist);
    }

    const user: IUser = {
      name,
      email,
      passwordHash: '',
      gender,
      role,
      location,
      birthDate: dto?.birthDate || dayjs(dto.birthDate).toDate(),
      avatar: dto?.avatar || '',
      friends: [],
      alerts: [],
      registrationDate: dayjs(new Date()).toDate(),
      refreshTokenHash: '',
    };

    if (role === UserRole.Client) {
      const { _id: nutDairyId } = await this.createNutritionDiary();
      const { _id: trDairyId } = await this.createTrainingDiary();
      const { _id: blcId } = await this.createUserBalance();

      const client: IClient = {
        ...user,
        level: dto.level,
        trainingType: dto.trainingType,
        trainingDuration: (dto as CreateClientDto).trainingDuration,
        caloriesToLose: (dto as CreateClientDto).caloriesToLose,
        caloriesToLosePerDay: (dto as CreateClientDto).caloriesToLosePerDay,
        description: (dto as CreateClientDto).description,
        readyToTraining: (dto as CreateClientDto).readyToTraining,
        favoriteGyms: [],
        nutritionDiaryId: nutDairyId,
        trainingDiaryId: trDairyId,
        balanceId: blcId,
        clientProgress: DEFAULT_CLIENT_PROGRESS,
      };

      const clientEntity = await new ClientEntity(client).setPassword(password);

      return await this.clientRepository.create(clientEntity);
    }

    const trainer: ITrainer = {
      ...user,
      level: dto.level,
      trainingType: dto.trainingType,
      certificates: (dto as CreateTrainerDto).certificates,
      merits: (dto as CreateTrainerDto).merits,
      personalTraining: (dto as CreateTrainerDto).personalTraining,
    };

    const trainerEntity = await new TrainerEntity(trainer).setPassword(
      password
    );

    return await this.trainerRepository.create(trainerEntity);
  }

  public async verifyUser({ email, password }: LoginUserDto) {
    const existUser =
      (await this.clientRepository.findByEmail(email)) ||
      (await this.trainerRepository.findByEmail(email));

    if (!existUser) {
      throw new UnauthorizedException(AuthErrorMessage.UserNotFound);
    }

    if (existUser.role === UserRole.Client) {
      const clientEntity = new ClientEntity(existUser as IClient);
      if (!(await clientEntity.comparePassword(password))) {
        throw new UnauthorizedException(AuthErrorMessage.UserPasswordWrong);
      }

      return clientEntity.toObject();
    }

    const trainerEntity = new TrainerEntity(existUser as ITrainer);
    if (!(await trainerEntity.comparePassword(password))) {
      throw new UnauthorizedException(AuthErrorMessage.UserPasswordWrong);
    }

    return trainerEntity.toObject();
  }

  public async loginUser(user: ClientEntity | TrainerEntity) {
    const { access_token, refresh_token } = await this.createTokens(user);

    this.saveRefreshTokenHash(refresh_token, user);

    return { access_token, refresh_token };
  }

  public async refresh({ userId }: IUser) {
    const existUser =
      (await this.clientRepository.findById(userId)) ||
      (await this.trainerRepository.findById(userId));

    if (!existUser) {
      throw new ForbiddenException(AuthErrorMessage.UserNotFound);
    }

    const userEntity =
      existUser.role === UserRole.Client
        ? new ClientEntity(existUser as IClient)
        : new TrainerEntity(existUser as ITrainer);

    if (!(await userEntity.compareRefreshToken(refreshToken))) {
      throw new ForbiddenException(AuthErrorMessage.RefreshTokenNotValid);
    }

    const { access_token, refresh_token } = await this.createTokens(userEntity);

    this.saveRefreshTokenHash(refresh_token, userEntity);

    return {
      _id: existUser._id,
      email: existUser.email,
      access_token,
      refresh_token,
    };
  }

  public async drop(id: Types.ObjectId) {
    const existUser =
      (await this.clientRepository.findById(id)) ||
      (await this.trainerRepository.findById(id));

    if (!existUser) {
      throw new UnauthorizedException(AuthErrorMessage.UserNotFound);
    }

    await this.quickUserUpdate(existUser._id, existUser.role, {
      refreshTokenHash: '',
    });

    return { refresh_token: '' };
  }

  public async getUser(id: Types.ObjectId) {
    const user =
      (await this.clientRepository.findById(id)) ||
      (await this.trainerRepository.findById(id));

    if (!user) {
      throw new NotFoundException(`User with id - ${id}, not found`);
    }

    return user;
  }

  public async getUsers(query: UsersQuery, userRole: UserRole) {
    if (userRole !== UserRole.Client) {
      throw new ForbiddenException(AuthErrorMessage.WrongUserRole);
    }

    if (query.limit > User.DefaultCountLimit) {
      throw new ForbiddenException(AuthErrorMessage.UsersCountExceeded);
    }

    if (query.userRole === 'client') {
      return await this.clientRepository.find(query);
    }

    if (query.userRole === 'trainer') {
      return await this.trainerRepository.find(query);
    }

    let limitForMixedUsers: number | undefined;
    if (query.limit) {
      limitForMixedUsers = query.limit / USERS_COLLECTIONS_COUNT;
    }

    let queryForMixedUsers: UsersQuery | undefined;
    if (limitForMixedUsers) {
      queryForMixedUsers = { ...query, limit: limitForMixedUsers } || {};
    }

    const users = [
      ...(await this.clientRepository.find(queryForMixedUsers || query)),
      ...(await this.trainerRepository.find(queryForMixedUsers || query)),
    ];

    return users;
  }

  public async getFriends(id: Types.ObjectId, userRole: UserRole) {
    let user: ITrainer | IClient;

    if (userRole === UserRole.Client) {
      user = await this.clientRepository.findById(id);
    } else {
      user = await this.trainerRepository.findById(id);
    }

    return [
      ...(await this.clientRepository.findFriends(user.friends)),
      ...(await this.trainerRepository.findFriends(user.friends)),
    ];
  }

  public async reqFriendship(
    { userId: respondentId }: RequestToUserDto,
    requestorId: Types.ObjectId,
    requestorRole: UserRole
  ) {
    if (requestorRole !== UserRole.Client) {
      throw new ForbiddenException(AuthErrorMessage.WrongUserRole);
    }

    if (`${requestorId}` === `${respondentId}`) {
      throw new ConflictException(AuthErrorMessage.SameId);
    }

    const requestor = await this.clientRepository.findById(requestorId);

    const respondent =
      (await this.clientRepository.findById(respondentId)) ||
      (await this.trainerRepository.findById(respondentId));

    if (!respondent) {
      throw new NotFoundException(`User with id - ${respondentId}, not found`);
    }

    if (respondent.friends.includes(`${requestorId}-reqFriendship`)) {
      throw new ConflictException(AuthErrorMessage.AlreadyRequested);
    }

    if (respondent.friends.includes(`${requestorId}`)) {
      throw new ConflictException(AuthErrorMessage.AlreadyHaveFriend);
    }

    const alert: IAlert = {
      text: `${requestor.name} ${
        requestor.gender === UserGender.Female ? 'отправила' : 'отправил'
      } вам запрос на добавление в друзья`,
      date: new Date(),
    };

    respondent.friends.push(`${requestorId}-reqFriendship`);
    respondent.alerts.push(alert);

    this.quickUserUpdate(respondent._id, respondent.role, respondent);
  }

  public async accFriendship(
    { userId: requestorId }: RequestToUserDto,
    respondentId: Types.ObjectId
  ) {
    const respondent =
      (await this.clientRepository.findById(respondentId)) ||
      (await this.trainerRepository.findById(respondentId));

    const requestor =
      (await this.clientRepository.findById(requestorId)) ||
      (await this.trainerRepository.findById(requestorId));

    if (!respondent.friends.includes(`${requestorId}-reqFriendship`)) {
      throw new ForbiddenException(AuthErrorMessage.CantAcceptFriend);
    }

    const index = respondent.friends.indexOf(`${requestorId}-reqFriendship`);
    respondent.friends[index] = `${requestorId}`;
    const updatedRespondent = await this.quickUserUpdate(
      respondent._id,
      respondent.role,
      respondent
    );

    if (updatedRespondent) {
      const alert: IAlert = {
        text: `${respondent.name} ${
          respondent.gender === UserGender.Female ? 'добавила' : 'добавил'
        } вас в друзья`,
        date: new Date(),
      };

      requestor.friends.push(`${respondentId}`);
      requestor.alerts.push(alert);

      this.quickUserUpdate(requestor._id, requestor.role, requestor);
    }
  }

  public async rejFriendship(
    { userId: requestorId }: RequestToUserDto,
    respondentId: Types.ObjectId
  ) {
    const requestor =
      (await this.clientRepository.findById(requestorId)) ||
      (await this.trainerRepository.findById(requestorId));

    const respondent =
      (await this.clientRepository.findById(respondentId)) ||
      (await this.trainerRepository.findById(respondentId));

    if (respondent.friends.includes(`${requestorId}`)) {
      throw new ForbiddenException(AuthErrorMessage.CantRejectFriend);
    }

    if (
      !respondent.friends.find(
        (friend) => friend.split('-')[0] === `${requestorId}`
      )
    ) {
      throw new ForbiddenException(AuthErrorMessage.CantRejectUser);
    }

    const index = respondent.friends.indexOf(`${requestorId}-reqFriendship`);
    respondent.friends = [
      ...respondent.friends.slice(0, index),
      ...respondent.friends.slice(index + 1),
    ];
    const updatedRespondent = await this.quickUserUpdate(
      respondent._id,
      respondent.role,
      respondent
    );

    if (updatedRespondent) {
      const alert: IAlert = {
        text: `${respondent.name} ${
          respondent.gender === UserGender.Female ? 'отклонила' : 'отклонил'
        } дружбу`,
        date: new Date(),
      };

      requestor.alerts.push(alert);

      this.quickUserUpdate(requestor._id, requestor.role, requestor);
    }
  }

  public async delFriend(
    { userId: friendId }: RequestToUserDto,
    userId: Types.ObjectId
  ) {
    const deletingFriend =
      (await this.clientRepository.findById(friendId)) ||
      (await this.trainerRepository.findById(friendId));

    const userWhoDeletesFriend =
      (await this.clientRepository.findById(userId)) ||
      (await this.trainerRepository.findById(userId));

    const friendIndex = userWhoDeletesFriend.friends.findIndex(
      (friend) => friend.split('-')[0] === `${friendId}`
    );

    if (friendIndex === -1) {
      throw new NotFoundException(AuthErrorMessage.DontHaveFriend);
    } else {
      userWhoDeletesFriend.friends = [
        ...userWhoDeletesFriend.friends.slice(0, friendIndex),
        ...userWhoDeletesFriend.friends.slice(friendIndex + 1),
      ];
    }

    const updatedUser = await this.quickUserUpdate(
      userWhoDeletesFriend._id,
      userWhoDeletesFriend.role,
      userWhoDeletesFriend
    );

    if (updatedUser) {
      const userIndex = deletingFriend.friends.findIndex(
        (friend) => friend.split('-')[0] === `${updatedUser._id}`
      );

      if (userIndex !== -1) {
        deletingFriend.friends = [
          ...deletingFriend.friends.slice(0, userIndex),
          ...deletingFriend.friends.slice(userIndex + 1),
        ];
      }

      const alert: IAlert = {
        text: `${updatedUser.name} ${
          updatedUser.gender === UserGender.Female ? 'удалила' : 'удалил'
        } вас из списка друзей`,
        date: new Date(),
      };
      deletingFriend.alerts.push(alert);

      await this.quickUserUpdate(
        deletingFriend._id,
        deletingFriend.role,
        deletingFriend
      );
    }
  }

  public async delAlerts(userId: Types.ObjectId) {
    const user =
      (await this.clientRepository.findById(userId)) ||
      (await this.trainerRepository.findById(userId));

    if (!user) {
      throw new NotFoundException(AuthErrorMessage.UserNotFound);
    }

    user.alerts = [];

    return await this.quickUserUpdate(user._id, user.role, user);
  }

  public async reqPersonalTraining(
    { userId: respondentId }: RequestToUserDto,
    requestorId: Types.ObjectId,
    requestorRole: UserRole
  ) {
    if (requestorRole !== UserRole.Client) {
      throw new ForbiddenException(AuthErrorMessage.WrongUserRole);
    }

    const requestor = await this.clientRepository.findById(requestorId);

    const respondent =
      (await this.clientRepository.findById(respondentId)) ||
      (await this.trainerRepository.findById(respondentId));

    if (!respondent) {
      throw new NotFoundException(AuthErrorMessage.UserNotFound);
    }

    if (
      !respondent.friends.find(
        (friend) => friend.split('-')[0] === `${requestorId}`
      )
    ) {
      throw new ConflictException(AuthErrorMessage.NotFriend);
    }

    if (
      respondent.role === UserRole.Trainer &&
      !(respondent as ITrainer).personalTraining
    ) {
      throw new ForbiddenException(AuthErrorMessage.NoPersonalTraining);
    }

    if (
      respondent.role === UserRole.Client &&
      !(respondent as IClient).readyToTraining
    ) {
      throw new ForbiddenException(AuthErrorMessage.NotReadyToTraining);
    }

    if (
      respondent.friends.includes(`${requestorId}-getReqTraining`) ||
      respondent.friends.includes(`${requestorId}-accTraining`) ||
      respondent.friends.includes(`${requestorId}-rejTraining`)
    ) {
      throw new ConflictException(AuthErrorMessage.AlreadyReqTraining);
    }

    const alert: IAlert = {
      text: `${requestor.name} ${
        requestor.gender === UserGender.Female ? 'запросила' : 'запросил'
      } ${
        respondent.role === UserRole.Trainer ? 'персональную' : 'совместную'
      } тренировку`,
      date: new Date(),
    };
    const requestorIndex = respondent.friends.indexOf(`${requestorId}`);
    respondent.friends[requestorIndex] = `${requestorId}-getReqTraining`;
    respondent.alerts.push(alert);
    const updatedRespondent = await this.quickUserUpdate(
      respondent._id,
      respondent.role,
      respondent
    );

    if (updatedRespondent) {
      const respondentIndex = requestor.friends.indexOf(`${respondentId}`);
      requestor.friends[respondentIndex] = `${respondentId}-sentReqTraining`;

      this.quickUserUpdate(requestor._id, requestor.role, requestor);
    }
  }

  public async accPersonalTraining(
    { userId: requestorId }: RequestToUserDto,
    respondentId: Types.ObjectId
  ) {
    const respondent =
      (await this.clientRepository.findById(respondentId)) ||
      (await this.trainerRepository.findById(respondentId));

    const requestor =
      (await this.clientRepository.findById(requestorId)) ||
      (await this.trainerRepository.findById(requestorId));

    if (!respondent.friends.includes(`${requestorId}-reqTraining`)) {
      throw new ForbiddenException(AuthErrorMessage.CantAcceptTraining);
    }

    const requestorIndex = respondent.friends.findIndex(
      (friend) => friend.split('-')[0] === `${requestorId}`
    );
    respondent.friends[requestorIndex] = `${requestorId}-accTraining`;
    const updatedRespondent = await this.quickUserUpdate(
      respondent._id,
      respondent.role,
      respondent
    );

    if (updatedRespondent) {
      const alert: IAlert = {
        text: `${respondent.name} ${
          respondent.gender === UserGender.Female ? 'приняла' : 'принял'
        } приглашение на ${
          respondent.role === UserRole.Trainer ? 'персональную' : 'совместную'
        } тренировку`,
        date: new Date(),
      };
      const respondentIndex = requestor.friends.findIndex(
        (friend) => friend.split('-')[0] === `${respondentId}`
      );
      requestor.friends[respondentIndex] = `${respondentId}-accTraining`;
      requestor.alerts.push(alert);

      await this.quickUserUpdate(requestor._id, requestor.role, requestor);
    }
  }

  public async rejPersonalTraining(
    { userId: requestorId }: RequestToUserDto,
    respondentId: Types.ObjectId
  ) {
    const requestor =
      (await this.clientRepository.findById(requestorId)) ||
      (await this.trainerRepository.findById(requestorId));

    const respondent =
      (await this.clientRepository.findById(respondentId)) ||
      (await this.trainerRepository.findById(respondentId));

    if (!respondent.friends.includes(`${requestorId}-reqTraining`)) {
      throw new ForbiddenException(AuthErrorMessage.CantAcceptTraining);
    }

    const requestorIndex = respondent.friends.findIndex(
      (friend) => friend.split('-')[0] === `${requestorId}`
    );
    respondent.friends[requestorIndex] = `${requestorId}-rejTraining`;
    const updatedRespondent = await this.quickUserUpdate(
      respondent._id,
      respondent.role,
      respondent
    );

    if (updatedRespondent) {
      const alert: IAlert = {
        text: `${respondent.name} ${
          respondent.gender === UserGender.Female ? 'отклонила' : 'отклонил'
        } приглашение на ${
          respondent.role === UserRole.Trainer ? 'персональную' : 'совместную'
        } тренировку`,
        date: new Date(),
      };
      const respondentIndex = requestor.friends.findIndex(
        (friend) => friend.split('-')[0] === `${respondentId}`
      );
      requestor.friends[respondentIndex] = `${respondentId}-rejTraining`;
      requestor.alerts.push(alert);

      await this.quickUserUpdate(requestor._id, requestor.role, requestor);
    }
  }

  public async updateUser(
    id: Types.ObjectId,
    dto: UpdateClientDto | UpdateTrainerDto
  ) {
    if (UnchangeableUserProperties.some((userProp) => userProp in dto)) {
      throw new ForbiddenException(AuthErrorMessage.UpdateForbiddenProperties);
    }

    const userBeforeUpdate =
      (await this.clientRepository.findById(id)) ||
      (await this.trainerRepository.findById(id));

    if (!userBeforeUpdate) {
      throw new NotFoundException(`User with id - ${id}, does not exist`);
    }

    if (userBeforeUpdate.role === UserRole.Client) {
      const clientEntity = new ClientEntity({
        ...(userBeforeUpdate as IClient),
        ...dto,
        birthDate: dto.birthDate
          ? dayjs(dto.birthDate).toDate()
          : userBeforeUpdate.birthDate,
      });

      const updatedClient = await this.clientRepository.update(
        id,
        clientEntity
      );

      return updatedClient;
    }

    const trainerEntity = new TrainerEntity({
      ...(userBeforeUpdate as ITrainer),
      ...dto,
      birthDate: dto.birthDate
        ? dayjs(dto.birthDate).toDate()
        : userBeforeUpdate.birthDate,
    });

    const updatedTrainer = await this.trainerRepository.update(
      id,
      trainerEntity
    );

    return updatedTrainer;
  }

  public async updateFavoriteGymsList(
    userId: Types.ObjectId,
    userRole: UserRole,
    { gymId }: ChangeFavoriteGymsDto,
    action: FavoriteGymsAction
  ) {
    if (userRole !== UserRole.Client) {
      throw new ForbiddenException(AuthErrorMessage.WrongUserRole);
    }

    const client = await this.clientRepository.findById(userId);

    if (action === FavoriteGymsAction.Add) {
      if (client.favoriteGyms.includes(gymId)) {
        throw new ConflictException(AuthErrorMessage.GymAlreadyFavorite);
      }

      client.favoriteGyms.push(gymId);
    }

    if (action === FavoriteGymsAction.Delete) {
      if (!client.favoriteGyms.includes(gymId)) {
        throw new ConflictException(AuthErrorMessage.GymNotFavorite);
      }

      const index = client.favoriteGyms.indexOf(gymId);
      client.favoriteGyms = [
        ...client.favoriteGyms.slice(0, index),
        ...client.favoriteGyms.slice(index + 1),
      ];
    }

    await this.quickUserUpdate(client._id, client.role, client);
  }

  private async createTokens(user: ClientEntity | TrainerEntity) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
      avatar: user.avatar,
      favoriteGyms: (user as ClientEntity).favoriteGyms,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('tokens.at_secret'),
      expiresIn:
        Number(this.configService.get('tokens.at_exp')) || TokenExpire.Access,
    });

    const refresh_token = await this.jwtService.signAsync(
      {},
      {
        secret: this.configService.get('tokens.rt_secret'),
        expiresIn:
          Number(this.configService.get('tokens.rt_exp')) ||
          TokenExpire.Refresh,
      }
    );

    return { access_token, refresh_token };
  }

  private async saveRefreshTokenHash(
    token: string,
    user: ClientEntity | TrainerEntity
  ) {
    if (user.role === UserRole.Client) {
      const clientEntity = new ClientEntity(user as ClientEntity);
      await clientEntity.setRefreshToken(token);
      this.clientRepository.update(user._id, {
        refreshTokenHash: clientEntity.refreshTokenHash,
      });
    } else {
      const trainerEntity = new TrainerEntity(user as TrainerEntity);
      await trainerEntity.setRefreshToken(token);
      this.trainerRepository.update(user._id, {
        refreshTokenHash: trainerEntity.refreshTokenHash,
      });
    }
  }

  private async createNutritionDiary(): Promise<INutritionDiary> {
    return this.nutritionDiaryRepository.create();
  }

  private async createTrainingDiary(): Promise<ITrainingDiary> {
    return this.trainingDiaryRepository.create();
  }

  private async createUserBalance(): Promise<IClientBalance> {
    return this.clientBalanceRepository.create();
  }

  private async quickUserUpdate(
    userId: Types.ObjectId,
    userRole: UserRole,
    updatedData: Partial<ClientEntity> | Partial<TrainerEntity>
  ) {
    if (userRole === UserRole.Client) {
      return this.clientRepository.update(
        userId,
        updatedData as Partial<ClientEntity>
      );
    } else {
      return this.trainerRepository.update(
        userId,
        updatedData as Partial<TrainerEntity>
      );
    }
  }
}
