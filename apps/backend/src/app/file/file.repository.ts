import { Injectable } from '@nestjs/common';
import { FileEntity } from './file.entity';
import { ICRUDRepository, IFile } from '@fit-friends/types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FileRepository
  implements ICRUDRepository<FileEntity, number, IFile>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(fileEntity: FileEntity): Promise<IFile> {
    const entity = fileEntity.toObject();
    return await this.prisma.file.create({
      data: { ...entity },
    });
  }
  public async destroy(id: number): Promise<void> {
    await this.prisma.file.delete({ where: { id } });
  }

  public async findById(id: number): Promise<IFile> {
    return await this.prisma.file.findFirst({
      where: {
        id,
      },
    });
  }

  public async findByHashName(hashName: string): Promise<IFile> {
    return await this.prisma.file.findFirst({ where: { hashName } });
  }

  public async findByPath(path: string): Promise<IFile> {
    return await this.prisma.file.findFirst({ where: { path } });
  }
}
