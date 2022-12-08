import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelService } from 'src/channel/channel.service';
import { ServerService } from 'src/server/server.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateServerMessageDto } from './dto/create-server-message.dto';
import { ServerMessage } from './entity/server-message.entity';
import { ServerMessageGateway } from './server-message.gateway';

@Injectable()
export class ServerMessageService {
    constructor(
        @InjectRepository(ServerMessage)
        private serverMessageRepository: Repository<ServerMessage>,
        private channelService: ChannelService,
        private serverService: ServerService,
        private userService: UserService,
        private serverMessageGateway: ServerMessageGateway
    ) { }

    async add(createServerMessageDto: CreateServerMessageDto, userId: number) {
        const server = await this.serverService.getById(createServerMessageDto.serverId);
        //gets servers user enrolled
        const servers = await this.serverService.getAllByUserId(userId);
        //checks if the user sends the message to a server that user enrolled
        const x = servers.find(server => server.id === createServerMessageDto.serverId)
        
        if (x === null) {
            throw new ForbiddenException()
        }

        const channel = await this.channelService.getByChannelId(createServerMessageDto.channelId);

        const message = this.serverMessageRepository.create(createServerMessageDto);
        message.channel = channel
        message.server = server
        message.user = await this.userService.getById(userId)
        const savedServerMessage = await this.serverMessageRepository.save(message);
        this.serverMessageGateway.server.emit('messageRecieved', {serverId: savedServerMessage.server.id, channelId: savedServerMessage.channel.id})
        return savedServerMessage
    }

    async getAllByChannelId(channelId: number, userId: number) {
        const server = await this.serverService.getAllByUserId(userId)
        
        if (server == null || server.length <= 0) {
            throw new ForbiddenException("You cannot see the messages of a channel of the server you are not enrolled!")
        }

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
                createdAt: true,
                user: {
                    id: true,
                    username: true,
                    status: true,
                    imagePath: true
                }
            },
            order: {
                createdAt: 'ASC'
            }
        })
        return message;
    }
}
