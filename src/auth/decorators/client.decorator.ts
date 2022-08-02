import { SetMetadata } from '@nestjs/common';
import { ClientRole } from 'src/enums/ClientRoles';

export const ROLES_KEY = 'client';
export const Roles = (...roles: ClientRole[]) => SetMetadata(ROLES_KEY, roles);
