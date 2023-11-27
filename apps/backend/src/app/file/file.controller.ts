import {
  Controller,
  Query,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DeleteCertificateQuery } from './query/delete-certificate.query';

@ApiTags('files')
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id') id: number) {
    const existFile = await this.fileService.getFileById(id);
    const path = `${this.configService.get('application.serveRoot')}${
      existFile.path
    }`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/certificate')
  public async deleteCertificate(@Query() query: DeleteCertificateQuery) {
    await this.fileService.deleteCertificate(query.certificateUrl);
    return query.certificateUrl;
  }
}
