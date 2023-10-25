import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { TrainingRepository } from './training.repository';
import { TrainingEntity } from './training.entity';
import CreateTrainingDto from './dto/create-training.dto';
import { TrainingQuery } from './query/training.query';

@Injectable()
export class TrainingService {
  private readonly logger = new Logger(TrainingService.name);

  constructor(private readonly trainingRepository: TrainingRepository) {}

  async create(dto: CreateTrainingDto) {
    const training = { ...dto, feedbacks: [] };
    const trainingEntity = new TrainingEntity(training);

    return await this.trainingRepository.create(trainingEntity);
  }

  async update(id: number, dto: UpdateTrainingDto) {
    const oldTraining = await this.trainingRepository.findById(id).catch((err) => {
      this.logger.error(err);
      throw new NotFoundException('Training not found');
    });

    if (oldTraining) {
      const trainingEntity = new TrainingEntity({
        ...oldTraining,
        ...dto,
      });

      return await this.trainingRepository.update(id, trainingEntity);
    } else {
      throw new NotFoundException('Training not found');
    }
  }

  public async getTraining(trainingId: number) {
    const training = await this.trainingRepository.findById(trainingId).catch((err) => {
      this.logger.error(err);
      throw new NotFoundException('Training not found');
    });

    if (!training) {
      throw new NotFoundException('Training not found');
    }
    return training;
  }

  public async getTrainings(query: TrainingQuery, trainerId: number) {
    return await this.trainingRepository.find(query, trainerId);
  }

  async remove(id: number) {
    return await this.trainingRepository.destroy(id);
  }

  public async getTrainingsByCatalog(query: TrainingQuery) {
    return await this.trainingRepository.findForCatalog(query);
  }

  public async getTrainingsByTrainerId(trainerId: number) {
    return await this.trainingRepository.findFromTrainer(trainerId);
  }
}
