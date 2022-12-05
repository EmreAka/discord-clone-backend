import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelService } from 'src/channel/channel.service';
import { ServerService } from 'src/server/server.service';
import { Repository } from 'typeorm';
import { CreateServerMessageDto } from './dto/create-server-message.dto';
import { ServerMessage } from './entity/server-message.entity';

@Injectable()
export class ServerMessageService {
    constructor(
        @InjectRepository(ServerMessage)
        private serverMessageRepository: Repository<ServerMessage>,
        private channelService: ChannelService,
        private serverService: ServerService
    ) { }

    async add(createServerMessageDto: CreateServerMessageDto, userId: number) {
        const server = await this.serverService.getById(createServerMessageDto.serverId);

        if (server.founder.id !== userId) {
            throw new ForbiddenException("This server is not yours")
        }

        const channel = await this.channelService.getByChannelId(createServerMessageDto.channelId);

        const message = this.serverMessageRepository.create(createServerMessageDto);
        message.channel = channel
        message.server = server

        return this.serverMessageRepository.save(message);
    }

    async getAllByChannelId(channelId: number) {
        const message = await this.serverMessageRepository.find({
            where: {
                channel: { id: channelId }
            },
            relations: {
                user: true,
            },
            select: {
                id: true,
                message: true,
                user: {
                    id: true,
                    username: true,
                    status: true,
                }
            }
        })
        return message;
    }
}
