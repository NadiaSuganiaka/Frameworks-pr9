import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';
export const ROLES_KEY='roles';
// Готова декларація metadata, не перевіряє токен самостійно.
export const Roles=(...roles:Role[])=>SetMetadata(ROLES_KEY,roles);
