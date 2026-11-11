import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';
import { Role } from './role.enum';
import type { AuthRequest } from './auth-request';
@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(ctx:ExecutionContext):boolean {
    const req=ctx.switchToHttp().getRequest<AuthRequest>();
    const match=/^Bearer ([^ ]+)$/.exec(req.headers.authorization ?? '');
    if(!match) throw new UnauthorizedException('TOKEN_REQUIRED');
    try {
      const claims=jwt.verify(match[1],jwtSecret(),{algorithms:['HS256'],issuer:'pr09-local',audience:'studyflow'});
      if(typeof claims==='string' || typeof claims.sub!=='string' || !Array.isArray(claims.roles) ||
        !claims.roles.every((r:unknown)=>r===Role.STUDENT || r===Role.ADMIN)) throw new Error('Invalid claims');
      req.user={id:claims.sub,roles:claims.roles};return true;
    } catch { throw new UnauthorizedException('INVALID_TOKEN'); }
  }
}
