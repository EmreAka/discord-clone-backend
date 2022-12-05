import { ConsoleLogger, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { ServerService } from 'src/server/server.service';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { Channel } from './entity/channel.entity';

@Injectable()
export class ChannelService {
    constructor(
        @InjectRepository(Channel)
        private channelRepository: Repository<Channel>,
        private serverService: ServerService,
        private categoryService: CategoryService,
    ) {}

    async add(createChannelDto: CreateChannelDto, userId: number){
        const server = await this.serverService.getById(createChannelDto.serverId)
        const category = await this.categoryService.getById(createChannelDto.categoryId);

        if (server.founder.id !== userId) {
            throw new ForbiddenException("You cannot add a channel to a category that belongs to the server that doesn't belong to you!")
        }

        const channel = this.channelRepository.create(createChannelDto)
        channel.category = category

        return this.channelRepository.save(channel)
    }
}
