import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('RolesGuard, пользователь:', user);
    
    if (!user) {
      throw new UnauthorizedException('Пользователь не аутентифицирован');
    }
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Запрещен доступ к ресурсу');
    }
    return true;
  }
}
