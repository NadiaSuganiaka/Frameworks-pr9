import type { Request } from 'express';
import { Role } from './role.enum';
export interface AuthRequest extends Request { user?: {id:string;roles:Role[]}; }
