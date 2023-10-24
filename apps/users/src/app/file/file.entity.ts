import { IEntity, IFile } from '@fit-friends/types';

export class FileEntity implements IEntity<FileEntity>, IFile {
  public hashName: string;
  public mimetype: string;
  public originalName: string;
  public path: string;
  public size: number;

  constructor(file: IFile) {
    this.fillEntity(file);
  }

  public fillEntity(entity: IFile) {
    this.hashName = entity.hashName;
    this.mimetype = entity.mimetype;
    this.originalName = entity.originalName;
    this.path = entity.path;
    this.size = entity.size;
  }

  public toObject(): FileEntity {
    return {
      ...this,
    };
  }
}
