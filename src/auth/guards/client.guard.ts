import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/auth/decorators/client.decorator';
import { ClientRole } from 'src/enums/ClientRoles';

@Injectable()
export class ClientGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowedRoles = this.reflector.getAllAndOverride<ClientRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (allowedRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (this.hasCompatibleRoles(user.roles, allowedRoles)) {
      return true;
    }

    return false;
  }

  private hasCompatibleRoles(
    userRoles: ClientRole[],
    allowedRoles: ClientRole[],
  ): boolean {
    for (let userRole of userRoles) {
      if (allowedRoles.includes(userRole)) {
        return true;
      }
    }
    return false;
  }
}
