import { UserRole } from '@fit-friends/types';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class RoleTrainerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role;

    if (userRole !== UserRole.Trainer) {
      throw new ForbiddenException('Пользователям здесь доступ запрещен');
    }

    return true;
  }
}
