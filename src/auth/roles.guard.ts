import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import type { AuthRequest } from './auth-request';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector:Reflector) {}
  canActivate(context:ExecutionContext):boolean {
    // metadata методу має пріоритет над metadata класу
    const required=this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
      context.getHandler(),context.getClass()
    ]);
    // F2: немає вимоги до ролей — пропускаємо (JWT перевіряє інший guard)
    if(!required || required.length===0) return true;
    // роль беремо лише з request.user, який сформував JwtGuard з підписаного токена
    const { user }=context.switchToHttp().getRequest<AuthRequest>();
    if(!user || !Array.isArray(user.roles)) return false;
    // false → NestJS автоматично повертає 403 Forbidden
    return required.some((role)=>user.roles.includes(role));
  }
}
