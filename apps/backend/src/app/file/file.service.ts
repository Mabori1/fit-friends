import 'multer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import dayjs from 'dayjs';
import { writeFile } from 'node:fs/promises';
import * as crypto from 'node:crypto';
import { extension } from 'mime-types';
import { FileEntity } from './file.entity';
import { FileRepository } from './file.repository';

type WritedFile = {
  hashName: string;
  fileExtension: string;
  subDirectory: string;
  path: string;
};

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly configService: ConfigService,
  ) {}

  public async writeFile(file: Express.Multer.File): Promise<WritedFile> {
    const [year, month] = dayjs().format('YYYY MM').split(' ');

    const uploadDirectory = this.configService.get(
      'application.uploadDirectory',
    );

    const subDirectory = `${year}/${month}`;

    const uuid = crypto.randomUUID();

    const fileExtension = extension(file.mimetype) || '';
    const hashName = `${uuid}.${fileExtension}`;

    const uploadDirectoryPath = `${uploadDirectory}/${year}/${month}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);
    return {
      hashName,
      fileExtension,
      subDirectory,
      path: `/${subDirectory}/${hashName}`,
    };
  }

  public async saveFile(file: Express.Multer.File) {
    const writedFile = await this.writeFile(file);
    const newFile = new FileEntity({
      size: file.size,
      hashName: writedFile.hashName,
      mimetype: file.mimetype,
      originalName: Buffer.from(file.originalname, 'latin1').toString('utf8'),
      path: writedFile.path,
    });

    return this.fileRepository.create(newFile);
  }

  public async getFileById(id: number) {
    const existFile = await this.fileRepository.findById(id);

    if (!existFile) {
      throw new NotFoundException(`File with ${id} not found.`);
    }

    return existFile;
  }

  public async getFileByHasName(hashName: string) {
    const existFile = await this.fileRepository.findByHashName(hashName);

    if (!existFile) {
      throw new NotFoundException(`File with ${hashName} not found.`);
    }

    return existFile;
  }

  public async deleteCertificate(url: string) {
    const existFile = await this.fileRepository.findByUrl(url);
    if (!existFile) {
      throw new NotFoundException(`File not found.`);
    }
    await this.fileRepository.destroy(existFile.id);
  }
}
