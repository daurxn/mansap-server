import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @IsInt()
  chatId: number;

  @IsNotEmpty()
  @IsString()
  content: string;
} 