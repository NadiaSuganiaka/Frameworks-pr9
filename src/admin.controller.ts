import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from './auth/jwt.guard';
import { RolesGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';
import { Role } from './auth/role.enum';
@Controller('admin')
export class AdminController {
  @Get('users')
  @Roles(Role.ADMIN) // F1: endpoint доступний лише ролі ADMIN
  @UseGuards(JwtGuard, RolesGuard) // F3: спершу JWT (формує request.user), потім перевірка ролі
  listUsers() {
    return [{id:2,name:'Student Demo',roles:[Role.STUDENT]},
      {id:1,name:'Admin Demo',roles:[Role.ADMIN]}];
  }
}
