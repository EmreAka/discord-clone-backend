import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async add(user: User): Promise<User> {
        var userdata = await this.userRepository.createQueryBuilder("user")
            .where("user.email = :email",{email: user.email})
            .orWhere("user.username = :username", {username: user.username})
            .getOne();

        if (userdata) {
            throw new BadRequestException("A user is already registered with these credentials.");
        }
        return this.userRepository.save(user);
    }

    getByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email: email } })
    }

    async getCurrentUser(email: string): Promise<UserDto> {
        var user = await this.userRepository.findOne({ where: { email: email } })
        return {email: user.email, firstName: user.firstName, lastName: user.lastName, username:user.username}
    }
}
