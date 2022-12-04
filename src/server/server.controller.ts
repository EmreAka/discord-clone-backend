import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import CreateServerDto from './dto/create-server.dto';
import { ServerService } from './server.service';

@Controller('server')
@UseGuards(AuthGuard('jwt'))
export class ServerController {
    constructor(
        private serverService: ServerService
    ) { }

    @Post('')
    add(@Body() createServerDto: CreateServerDto){
        return this.serverService.add(createServerDto)
    }

    @Get()
    getAll(){
        return this.serverService.getAll();
    }

    @Post('enroll/:userId/:serverId')
    enroll(@Param('userId', ParseIntPipe) userId: number, @Param('serverId', ParseIntPipe)serverId: number){
        return this.serverService.enroll(userId, serverId)
    }
}
