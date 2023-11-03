import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ICRUDRepository, ITraining } from '@fit-friends/types';
import { TrainingEntity } from './training.entity';

@Injectable()
export class TrainingRepository
  implements ICRUDRepository<TrainingEntity, number, ITraining>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(
    fitnessTrainingEntity: TrainingEntity,
  ): Promise<ITraining> {
    const entityData = fitnessTrainingEntity.toObject();
    return await this.prisma.training.create({
      data: {
        ...entityData,
        feedbacks: {
          connect: [],
        },
      },
      include: { feedbacks: true },
    });
  }

  public async findByTitle(title: string): Promise<ITraining | null> {
    return this.prisma.training.findFirst({
      where: {
        title,
      },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.training.delete({
      where: {
        id,
      },
      include: { feedbacks: true },
    });
  }

  public async findById(id: number): Promise<ITraining | null> {
    return this.prisma.training.findFirst({
      where: {
        id,
      },
      include: { feedbacks: true },
    });
  }

  public async findByIdNotFeedback(id: number): Promise<ITraining | null> {
    return this.prisma.training.findFirst({
      where: {
        id,
      },
    });
  }

  public async update(
    id: number,
    trainingEntity: TrainingEntity,
  ): Promise<ITraining> {
    const entityData = trainingEntity.toObject();
    return await this.prisma.training.update({
      where: {
        id,
      },
      data: {
        ...entityData,
        feedbacks: {
          connect: trainingEntity.feedbacks.map(({ id }) => ({
            id,
          })),
        },
      },
    });
  }

  public async find(
    {
      limit,
      page,
      priceMin,
      priceMax,
      caloriesMin,
      caloriesMax,
      ratingMin,
      ratingMax,
      durations,
    },
    trainerId: number,
  ): Promise<ITraining[] | null> {
    return await this.prisma.training.findMany({
      where: {
        AND: [
          { trainerId },
          { price: { gte: priceMin, lte: priceMax } },
          { caloriesQtt: { gte: caloriesMin, lte: caloriesMax } },
          { rating: { gte: ratingMin, lte: ratingMax } },
          { duration: { in: durations } },
        ],
      },

      include: { feedbacks: true },
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async findForCatalog({
    limit,
    page,
    priceMin,
    priceMax,
    caloriesMin,
    caloriesMax,
    ratingMin,
    ratingMax,
    types,
    priceSort,
  }): Promise<ITraining[] | null> {
    return await this.prisma.training.findMany({
      where: {
        AND: [
          { price: { gte: priceMin, lte: priceMax } },
          { caloriesQtt: { gte: caloriesMin, lte: caloriesMax } },
          { rating: { gte: ratingMin, lte: ratingMax } },
          { typeOfTraining: { in: types } },
        ],
      },
      orderBy:
        priceSort !== 'none'
          ? priceSort === 'asc'
            ? { price: 'asc' }
            : { price: 'desc' }
          : { createdAt: 'desc' },
      include: { feedbacks: true },
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async findByTranerId(trainerId: number): Promise<ITraining[] | null> {
    return await this.prisma.training.findMany({
      where: { trainerId },
    });
  }

  public async findRecomend({
    typesOfTraining,
    caloriesQtt,
    duration,
    levelOfUser,
  }): Promise<ITraining[] | null> {
    return await this.prisma.training.findMany({
      where: {
        AND: [
          { caloriesQtt: { gte: caloriesQtt } },
          { duration },
          { levelOfUser },
          { typeOfTraining: { in: typesOfTraining } },
        ],
      },
      orderBy: { rating: 'desc' },
    });
  }

  public async findFromTrainer(trainerId: number): Promise<ITraining[] | null> {
    return await this.prisma.training.findMany({
      where: {
        trainerId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
