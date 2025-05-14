import { Role } from 'src/auth/enums/role.enum';
export declare const ROLE_KEY = "role";
export declare const Roles: (...role: Role[]) => import("@nestjs/common").CustomDecorator<string>;
