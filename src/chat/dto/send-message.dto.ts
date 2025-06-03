import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendMessageDto {
  @IsInt()
  chatId: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
