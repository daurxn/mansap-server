import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get()
  findAll(@Request() req: AuthenticatedRequest) {
    return this.chatService.findAll(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.chatService.findOne(id, req.user.id);
  }

  @Get('jobs/:jobId')
  @UseGuards(AuthGuard)
  findOneByJob(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.chatService.findOneByJob(jobId, req.user.id);
  }

  @Post('message')
  sendMessage(
    @Body() sendMessageDto: SendMessageDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.chatService.sendMessage(sendMessageDto, req.user.id);
  }

  @Patch('message/:id/status')
  updateMessageStatus(
    @Param('id') id: string,
    @Body() statusDto: UpdateMessageStatusDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.chatService.updateMessageStatus(+id, req.user.id, statusDto);
  }

  @Post(':id/read')
  markChatAsRead(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.chatService.markChatAsRead(+id, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.chatService.remove(+id);
  }
}
