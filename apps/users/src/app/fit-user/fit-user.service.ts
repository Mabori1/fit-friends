import { Injectable } from '@nestjs/common';
import { CreateFitUserDto } from './dto/create-fit-user.dto';
import { UpdateFitUserDto } from './dto/update-fit-user.dto';

@Injectable()
export class FitUserService {
  create(createFitUserDto: CreateFitUserDto) {
    return 'This action adds a new fitUser';
  }

  findAll() {
    return `This action returns all fitUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fitUser`;
  }

  update(id: number, updateFitUserDto: UpdateFitUserDto) {
    return `This action updates a #${id} fitUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} fitUser`;
  }
}
