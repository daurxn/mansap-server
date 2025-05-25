import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as AuthGuardPassport } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends AuthGuardPassport('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    // Safe to return the user after validation
    return user;
  }
}
