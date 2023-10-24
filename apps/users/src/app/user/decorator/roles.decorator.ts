import { UserRole } from '@fit-friends/types';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<UserRole>();
