import { randomUUID } from 'node:crypto';
import { FitUserEntity } from './fit-user.entity';
import { IUser } from '@fit-friends/shared/app-types';
import { CRUDRepository } from '@fit-friends/util/util-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FitUserMemoryRepository
  implements CRUDRepository<FitUserEntity, string, IUser>
{
  private repository: Record<string, IUser> = {};

  public async create(item: FitUserEntity): Promise<IUser> {
    const entry = { ...item.toObject(), _id: randomUUID() };
    this.repository[entry._id] = entry;

    return entry;
  }

  public async findById(id: string): Promise<IUser> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }

    return null;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const existUser = Object.values(this.repository).find(
      (userItem) => userItem.email === email
    );

    if (!existUser) {
      return null;
    }

    return { ...existUser };
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: FitUserEntity): Promise<IUser> {
    this.repository[id] = { ...item.toObject() };
    return this.findById(id);
  }
}
