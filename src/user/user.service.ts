import { Injectable } from '@nestjs/common';
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

    add(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    getByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { Email: email } })
    }

    async getCurrentUser(email: string): Promise<UserDto> {
        var user = await this.userRepository.findOne({ where: { Email: email } })
        return {email: user.Email, firstName: user.FirstName, lastName: user.LastName, username:user.Username}
    }
}
