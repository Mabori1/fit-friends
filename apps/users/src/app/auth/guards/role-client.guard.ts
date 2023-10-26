import { UserRole } from '@fit-friends/types';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class RoleClientGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role;

    if (userRole !== UserRole.Client) {
      throw new ForbiddenException('Тренерам здесь доступ запрещен');
    }

    return true;
  }
}
