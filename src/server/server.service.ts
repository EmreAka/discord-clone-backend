import { BadRequestException, Injectable } from '@nestjs/common';
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
        //TODO: Get user and pass it in server.
        const server = this.serverRepository.create(createServerDto);
        return this.serverRepository.save(server);
    }

    getById(id: number){
        return this.serverRepository.findOne({where: {id: id}, relations: {
            founder: true
        }});
    }

    getAll(){
        return this.serverRepository.find();
    }

    getAllByUserId(userId: number){
        return this.serverRepository.createQueryBuilder('server')
        .leftJoinAndSelect("server.users", "users")
        .where("users.id = :id", {id: userId})
        .select(['server.id', 'server.name', 'server.description', 'server.imagePath',])
        .getMany();
    }

    async enroll(userId: number, serverId: number){
        const user = await this.userService.getById(userId);
        let server = await this.serverRepository.findOne({where:{id: serverId}, relations: {
            users: true
        }})

        server.users.forEach(user => {
            if (user.id == userId) {
                throw new BadRequestException("You already enrolled!")
            }
        });

        server.users.push(user)

        this.serverRepository.save(server);
    }
}
