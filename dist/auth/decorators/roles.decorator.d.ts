import { AdminRole } from 'src/enums/AdminRoles';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: AdminRole[]) => import("@nestjs/common").CustomDecorator<string>;
