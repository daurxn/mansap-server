import { IsArray, IsInt, IsOptional } from 'class-validator';

export class CreateChatDto {
  @IsArray()
  @IsInt({ each: true })
  participantIds: number[];

  @IsOptional()
  @IsInt()
  jobId?: number;
}
