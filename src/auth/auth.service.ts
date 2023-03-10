import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { createHmac, randomBytes } from 'crypto';

@Injectable()
export class AuthService {
    constructor(private jwt: JwtService, private userService: UserService) { }

    async signin(user: SignInUserDto) {
        const data = await this.userService.getByEmail(user.email);

        //const crypto = require('crypto');
        //var salt = crypto.randomBytes(128); use this to generate salt.
        const hmac = createHmac('SHA512', data.passwordSalt);
        hmac.update(user.password);
        const computedHash: Buffer = hmac.digest();

        if (Buffer.compare(computedHash, data.passwordHash) === 0) {
            return this.signToken(data.id, data.email, data.username);
        }
        throw new BadRequestException("Wrong credentials");
    }

    signup(signupUserDto: SignupUserDto): Promise<User> {
        const user: User = new User();
        user.email = signupUserDto.email;
        user.firstName = signupUserDto.firstName;
        user.lastName = signupUserDto.lastName;
        user.username = signupUserDto.userName;
        user.status = true;

        //salt and hash the password
        var salt = randomBytes(128);
        const hmac = createHmac('SHA512', salt);
        hmac.update(signupUserDto.password);
        const computedHash: Buffer = hmac.digest();

        user.passwordSalt = salt;
        user.passwordHash = computedHash;

        return this.userService.add(user);
    }

    private signToken(userId: number, email: string, username: string): Promise<string> {
        const data = { sub: userId, email: email , username: username}

        return this.jwt.signAsync(data, {
            expiresIn: '15m',
            secret: process.env.SECRET_KEY, //.env dosyasına taşı
        })
    }
}
