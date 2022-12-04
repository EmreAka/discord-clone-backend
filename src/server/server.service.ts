import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import CreateServerDto from './dto/create-server.dto';
import { Server } from './entity/server.entity';

@Injectable()
export class ServerService {
    constructor(
        @InjectRepository(Server)
        private serverRepository: Repository<Server>,
        private userService: UserService,
    ) {}

    add(createServerDto: CreateServerDto){
        const server = this.serverRepository.create(createServerDto);
        return this.serverRepository.save(server);
    }

    getAll(){
        return this.serverRepository.find();
    }

    async enroll(userId: number, serverId: number){
        const user = await this.userService.getById(userId);
        let server = await this.serverRepository.findOne({where:{id: serverId}})

        server.users = [user]

        this.serverRepository.save(server);
    }
}
