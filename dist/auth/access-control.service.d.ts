import { Role } from './enums/role.enum';
interface IsAuthorizedParams {
    currentRole: Role;
    requiredRole: Role;
}
export declare class AccessControlService {
    private hierarchies;
    private priority;
    constructor();
    private buildRoles;
    isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams): boolean;
}
export {};
