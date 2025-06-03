import { UploadService } from './upload.service';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadChatImage(file: any, req: AuthenticatedRequest): Promise<{
        imageUrl: string;
    }>;
}
