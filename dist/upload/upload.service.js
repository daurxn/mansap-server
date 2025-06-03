"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const supabase_config_1 = require("../config/supabase.config");
const uuid_1 = require("uuid");
let UploadService = class UploadService {
    async uploadChatImage(file, userId) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        if (!file.mimetype.includes('image/')) {
            throw new common_1.BadRequestException('Only image files are allowed');
        }
        const fileExt = file.originalname.split('.').pop();
        const fileName = `${userId}/${(0, uuid_1.v4)()}.${fileExt}`;
        const { error } = await supabase_config_1.supabaseClient.storage
            .from(supabase_config_1.CHAT_IMAGES_BUCKET)
            .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            cacheControl: '3600',
        });
        if (error) {
            throw new common_1.BadRequestException(`Failed to upload image: ${error.message}`);
        }
        const { data: publicUrlData } = supabase_config_1.supabaseClient.storage
            .from(supabase_config_1.CHAT_IMAGES_BUCKET)
            .getPublicUrl(fileName);
        return publicUrlData.publicUrl;
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
//# sourceMappingURL=upload.service.js.map