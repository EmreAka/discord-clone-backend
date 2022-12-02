import { ForbiddenException, Injectable } from '@nestjs/common';
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
        const hmac = createHmac('SHA512', data.PasswordSalt);
        hmac.update(user.password);
        const computedHash: Buffer = hmac.digest();

        if (Buffer.compare(computedHash, data.PasswordHash) === 0) {
            return this.signToken(data.Id, data.Email);
        }
        throw new ForbiddenException("Wrong credentials");
    }

    signup(signupUserDto: SignupUserDto): Promise<User> {
        const user: User = new User();
        user.Email = signupUserDto.email;
        user.FirstName = signupUserDto.firstName;
        user.LastName = signupUserDto.lastName;
        user.Status = true;

        //salt and hash the password
        var salt = randomBytes(128);
        const hmac = createHmac('SHA512', salt);
        hmac.update(signupUserDto.password);
        const computedHash: Buffer = hmac.digest();

        user.PasswordSalt = salt;
        user.PasswordHash = computedHash;

        return this.userService.add(user);
    }

    private signToken(userId: number, email: string): Promise<string> {
        const data = { sub: userId, email: email }

        return this.jwt.signAsync(data, {
            expiresIn: '15m',
            secret: process.env.SECRET_KEY, //.env dosyasına taşı
        })
    }
}
