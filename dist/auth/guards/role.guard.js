"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const access_control_service_1 = require("../access-control.service");
let RoleGuard = class RoleGuard {
    reflector;
    accessControlService;
    constructor(reflector, accessControlService) {
        this.reflector = reflector;
        this.accessControlService = accessControlService;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context
            .switchToHttp()
            .getRequest();
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
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        access_control_service_1.AccessControlService])
], RoleGuard);
//# sourceMappingURL=role.guard.js.map