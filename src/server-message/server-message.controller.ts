import { Body, Controller, Post, UseGuards, Request, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateServerMessageDto } from './dto/create-server-message.dto';
import { ServerMessageService } from './server-message.service';

@Controller('server-message')
@UseGuards(AuthGuard('jwt'))
export class ServerMessageController {

    constructor(
        private serverMessageService: ServerMessageService
    ) {}

    @Post()
    add(@Body() createServerMessageDto: CreateServerMessageDto, @Request() req){
        const userId = req.user.userId
        return this.serverMessageService.add(createServerMessageDto, userId);
    }

    @Get(':channelId')
    getByChannelId(@Param('channelId', ParseIntPipe) channelId: number, @Request() req){
        const userId = req.user.userId
        return this.serverMessageService.getAllByChannelId(channelId, userId);
    }
}
