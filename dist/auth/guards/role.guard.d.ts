import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessControlService } from 'src/auth/access-control.service';
export declare class RoleGuard implements CanActivate {
    private reflector;
    private accessControlService;
    constructor(reflector: Reflector, accessControlService: AccessControlService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
