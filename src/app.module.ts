import { Module,Controller,Get,UseGuards,Req } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { JwtGuard } from './auth/jwt.guard';
import { RolesGuard } from './auth/roles.guard';
import type { AuthRequest } from './auth/auth-request';
@Controller()
class HealthController {
  @Get('health') health(){return {status:'ok'};}
  @Get('me') @UseGuards(JwtGuard) me(@Req() req:AuthRequest){return req.user;}
}
@Module({controllers:[HealthController,AdminController],providers:[JwtGuard,RolesGuard]})
export class AppModule {}
