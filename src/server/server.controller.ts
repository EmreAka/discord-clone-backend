import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, Request, Query } from '@nestjs/common';
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
    add(@Body() createServerDto: CreateServerDto, @Request() req){
        const userId = req.user.userId;
        return this.serverService.add(createServerDto, userId)
    }

    @Get('')
    getAll(
        @Query('page', ParseIntPipe) page: number,
        @Query('pageSize', ParseIntPipe) pageSize: number,
        @Query('keyword') keyword: string
    ){
        // return this.serverService.getAll();
        const query = {page, pageSize, keyword}
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
