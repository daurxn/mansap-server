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
exports.CreateJobDto = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class CreateJobDto {
    name;
    description;
    salary;
    unit;
    experienceLevel;
    jobType;
    locationId;
    tags;
}
exports.CreateJobDto = CreateJobDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Job name should not be empty.' }),
    (0, class_validator_1.IsString)({ message: 'Job name must be a string.' }),
    (0, class_validator_1.MinLength)(3, { message: 'Job name must be at least 3 characters long.' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Job name cannot be longer than 100 characters.' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Description should not be empty.' }),
    (0, class_validator_1.IsString)({ message: 'Description must be a string.' }),
    (0, class_validator_1.MinLength)(10, {
        message: 'Description must be at least 10 characters long.',
    }),
    (0, class_validator_1.MaxLength)(5000, {
        message: 'Description cannot be longer than 5000 characters.',
    }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Salary should not be empty.' }),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 }, { message: 'Salary must be a valid number with up to two decimal places.' }),
    (0, class_validator_1.IsPositive)({ message: 'Salary must be a positive number.' }),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "salary", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Unit for salary should not be empty.' }),
    (0, class_validator_1.IsEnum)(client_1.Unit, {
        message: 'Invalid unit. Must be one of: HOUR, DAY, PROJECT.',
    }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Experience level should not be empty.' }),
    (0, class_validator_1.IsEnum)(client_1.ExperienceLevel, {
        message: 'Invalid experience level. Must be one of: JUNIOR, MID, SENIOR.',
    }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "experienceLevel", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Job type should not be empty.' }),
    (0, class_validator_1.IsEnum)(client_1.JobType, {
        message: 'Invalid job type. Must be one of: FULL_TIME, PART_TIME, CONTRACT.',
    }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "jobType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Location ID must be an integer.' }),
    (0, class_validator_1.IsPositive)({ message: 'Location ID must be a positive number.' }),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "locationId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Tags must be an array of strings.' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Each tag must be a string.' }),
    (0, class_validator_1.ArrayMinSize)(1, {
        message: 'If tags are provided, there must be at least one tag.',
    }),
    (0, class_validator_1.MinLength)(2, {
        each: true,
        message: 'Each tag must be at least 2 characters long.',
    }),
    (0, class_validator_1.MaxLength)(50, {
        each: true,
        message: 'Each tag cannot be longer than 50 characters.',
    }),
    __metadata("design:type", Array)
], CreateJobDto.prototype, "tags", void 0);
//# sourceMappingURL=create-job.dto.js.map