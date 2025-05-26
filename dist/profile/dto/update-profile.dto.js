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
exports.UpdateProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateProfileDto {
    age;
    gender;
    locationId;
    resume;
    bio;
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User age. Must be a non-negative integer.',
        example: 30,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Age must be an integer.' }),
    (0, class_validator_1.Min)(0, { message: 'Age cannot be negative.' }),
    __metadata("design:type", Number)
], UpdateProfileDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User gender.',
        example: 'Male',
        maxLength: 50,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Gender must be a string.' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Gender cannot exceed 50 characters.' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "ID of the user's location. Must be an integer.",
        example: 1,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Location ID must be a number.' }),
    (0, class_validator_1.IsInt)({ message: 'Location ID must be an integer.' }),
    __metadata("design:type", Number)
], UpdateProfileDto.prototype, "locationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Link or reference to the user's resume.",
        example: 'https://example.com/resume.pdf',
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Resume must be a string.' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Resume cannot exceed 255 characters.' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "resume", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Short biography of the user.',
        example: 'Experienced software developer with a passion for AI.',
        maxLength: 500,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Bio must be a string.' }),
    (0, class_validator_1.MaxLength)(500, { message: 'Bio cannot exceed 500 characters.' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "bio", void 0);
//# sourceMappingURL=update-profile.dto.js.map