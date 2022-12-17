import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import CreateServerDto from './dto/create-server.dto';
import { Query } from './dto/query.dto';
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

    @Get('')
    getAll(@Body() query: Query){
        // return this.serverService.getAll();
        return this.serverService.getAllPaginated(query)
    }

    @Get('enrolled')
    getAllByUserId(@Request() req){
        const userId = req.user.userId;
        return this.serverService.getAllByUserId(userId);
    }

    @Post(':serverId')
    enroll(@Request() req, @Param('serverId', ParseIntPipe)serverId: number){
        const userId = req.user.userId;
        return this.serverService.enroll(userId, serverId)
    }
}
