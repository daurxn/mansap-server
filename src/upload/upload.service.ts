import { Injectable, BadRequestException } from '@nestjs/common';
import { supabaseClient, CHAT_IMAGES_BUCKET } from '../config/supabase.config';
import { v4 as uuidv4 } from 'uuid';

// Define the Multer file interface since it's not exported by Express
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

@Injectable()
export class UploadService {
  /**
   * Upload an image to Supabase storage
   * @param file The file buffer from multer
   * @param userId The ID of the user uploading the file
   * @returns The URL of the uploaded image
   */
  async uploadChatImage(file: MulterFile, userId: number): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Check file type
    if (!file.mimetype.includes('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    // Generate a unique file name
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${userId}/${uuidv4()}.${fileExt}`;

    // Upload to Supabase
    const { error } = await supabaseClient.storage
      .from(CHAT_IMAGES_BUCKET)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '3600',
      });

    if (error) {
      throw new BadRequestException(`Failed to upload image: ${error.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabaseClient.storage
      .from(CHAT_IMAGES_BUCKET)
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  }
}
