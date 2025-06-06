import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from '../../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { AccessControlService } from '../access-control.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessControlService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Get the request object and properly type it
    const request = context
      .switchToHttp()
      .getRequest<{ user: { role: Role } }>();

    // Ensure user exists before accessing properties
    if (!request.user) {
      return false;
    }

    const userRole = request.user.role;

    for (const role of requiredRoles) {
      const result = this.accessControlService.isAuthorized({
        requiredRole: role,
        currentRole: userRole,
      });

      if (result) {
        return true;
      }
    }

    return false;
  }
}
