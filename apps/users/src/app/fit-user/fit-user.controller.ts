import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FitUserService } from './fit-user.service';
import { CreateFitUserDto } from './dto/create-fit-user.dto';
import { UpdateFitUserDto } from './dto/update-fit-user.dto';

@Controller('fit-user')
export class FitUserController {
  constructor(private readonly fitUserService: FitUserService) {}

  @Post()
  create(@Body() createFitUserDto: CreateFitUserDto) {
    return this.fitUserService.create(createFitUserDto);
  }

  @Get()
  findAll() {
    return this.fitUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fitUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFitUserDto: UpdateFitUserDto) {
    return this.fitUserService.update(+id, updateFitUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fitUserService.remove(+id);
  }
}
