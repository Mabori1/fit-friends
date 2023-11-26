import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import {
  ImageTypes,
  MAX_AVATAR_FILE_SIZE,
  TOO_BIG_FILE,
  VideoTypes,
  WRONG_FILE_TYPE,
} from '@fit-friends/types';
import { FileService } from './file.service';
import { fillObject } from '@fit-friends/core';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/upload/video')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadVideoFile(@UploadedFile() file: Express.Multer.File) {
    const fileType = file.originalname.slice(
      file.originalname.lastIndexOf('.') + 1,
    );
    if (!VideoTypes.includes(fileType)) {
      throw new HttpException(
        { status: HttpStatus.NOT_ACCEPTABLE, error: WRONG_FILE_TYPE },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const newFile = await this.fileService.saveFile(file);
    const path = `${this.configService.get<string>('application.serveRoot')}${
      newFile.path
    }`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Post('/upload/img')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadImageFile(@UploadedFile() file: Express.Multer.File) {
    const fileType = file.originalname.slice(
      file.originalname.lastIndexOf('.') + 1,
    );
    if (file.size > MAX_AVATAR_FILE_SIZE) {
      throw new HttpException(
        { status: HttpStatus.NOT_ACCEPTABLE, error: TOO_BIG_FILE },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    if (!ImageTypes.includes(fileType)) {
      throw new HttpException(
        { status: HttpStatus.NOT_ACCEPTABLE, error: WRONG_FILE_TYPE },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const newFile = await this.fileService.saveFile(file);
    const path = `${this.configService.get<string>('application.serveRoot')}${
      newFile.path
    }`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Post('/upload/pdf')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadPDFile(@UploadedFile() file: Express.Multer.File) {
    const fileType = file.originalname.slice(
      file.originalname.lastIndexOf('.') + 1,
    );

    if (
      !(
        fileType === 'pdf' ||
        fileType === 'jpg' ||
        fileType === 'png' ||
        fileType === 'jpeg'
      )
    ) {
      throw new HttpException(
        { status: HttpStatus.NOT_ACCEPTABLE, error: WRONG_FILE_TYPE },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const newFile = await this.fileService.saveFile(file);
    const path = `${this.configService.get('application.serveRoot')}${
      newFile.path
    }`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Get(':id')
  public async show(@Param('id') id: number) {
    const existFile = await this.fileService.getFileById(id);
    const path = `${this.configService.get('application.serveRoot')}${
      existFile.path
    }`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }
}
