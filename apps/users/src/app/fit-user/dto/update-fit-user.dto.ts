import { PartialType } from '@nestjs/mapped-types';
import { CreateFitUserDto } from './create-fit-user.dto';

export class UpdateFitUserDto extends PartialType(CreateFitUserDto) {}
