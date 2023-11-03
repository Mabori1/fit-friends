import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import CreateTrainingDto from './dto/create-training.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingQuery } from './query/training.query';
import { TrainingService } from './training.service';
import { TrainingRdo } from './rdo/training.tdo';
import { IRequestWithTokenPayload } from '@fit-friends/types';
import { fillObject } from '@fit-friends/core';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleTrainerGuard } from '../auth/guards/role-trainer.guard';

@ApiTags('trainings')
@Controller('trainings')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: 'The new training has been successfully created.',
  })
  @UseGuards(RoleTrainerGuard, JwtAuthGuard)
  @Post('/create')
  public async create(@Body() dto: CreateTrainingDto) {
    const newTraining = await this.trainingService.create(dto);
    return fillObject(TrainingRdo, newTraining);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'The training has been successfully updates.',
  })
  @UseGuards(RoleTrainerGuard, JwtAuthGuard)
  @Patch(':id')
  public async update(@Param('id') id: number, @Body() dto: UpdateTrainingDto) {
    const updatedTraiding = await this.trainingService.update(id, dto);
    return fillObject(TrainingRdo, updatedTraiding);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'The training list has been successfully created.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/catalog')
  public async showTrainingsForCatalog(@Query() query: TrainingQuery) {
    const trainings = await this.trainingService.getTrainingsByCatalog(query);
    return { ...fillObject(TrainingRdo, trainings) };
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'The training list has been successfully created.',
  })
  @UseGuards(RoleTrainerGuard, JwtAuthGuard)
  @Get('/feed')
  public async feedLine(
    @Query() query: TrainingQuery,
    @Req() { user: payload }: IRequestWithTokenPayload,
  ) {
    const trainings = await this.trainingService.getTrainings(
      query,
      payload.sub,
    );
    return { ...fillObject(TrainingRdo, trainings) };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/bytrainer/:id')
  public async showByTrainer(@Param('id', ParseIntPipe) id: number) {
    const trainings = await this.trainingService.getTrainingsByTrainerId(id);
    return { ...fillObject(TrainingRdo, trainings) };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', ParseIntPipe) id: number) {
    const updatedTraiding = await this.trainingService.getTraining(id);
    return fillObject(TrainingRdo, updatedTraiding);
  }
}
