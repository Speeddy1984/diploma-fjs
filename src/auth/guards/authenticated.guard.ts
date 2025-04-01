import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log('Сессия пользователя:', request.user);
    if (request.isAuthenticated && request.isAuthenticated()) {
      return true;
    } else {
      throw new UnauthorizedException('Пользователь не аутентифицирован');
    }
  }
}
