import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';

@Controller('channel')
@UseGuards(AuthGuard('jwt'))
export class ChannelController {
    constructor(private channelService: ChannelService) { }

    @Post('')
    add(@Body() createChannelDto: CreateChannelDto, @Request() req){
        const userId = req.user.userId
        return this.channelService.add(createChannelDto, userId)
    }
}
