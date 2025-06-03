interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
    destination?: string;
    filename?: string;
    path?: string;
}
export declare class UploadService {
    uploadChatImage(file: MulterFile, userId: number): Promise<string>;
}
export {};
