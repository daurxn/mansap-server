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
exports.RegisterDto = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class RegisterDto {
    name;
    email;
    password;
    role;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name should not be empty.' }),
    (0, class_validator_1.IsString)({ message: 'Name must be a string.' }),
    (0, class_validator_1.MinLength)(2, { message: 'Name must be at least 2 characters long.' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Name cannot be longer than 50 characters.' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email should not be empty.' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address.' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Password should not be empty.' }),
    (0, class_validator_1.IsString)({ message: 'Password must be a string.' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long.' }),
    (0, class_validator_1.MaxLength)(128, { message: 'Password cannot be longer than 128 characters.' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.Role, {
        message: 'Role must be a valid role (e.g., USER, ADMIN, MODERATOR).',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "role", void 0);
//# sourceMappingURL=register.dto.js.map