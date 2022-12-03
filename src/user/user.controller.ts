import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get("")
    getUsers() {
        return this.userService.getAll();
    }

    @Get("me")
    @UseGuards(AuthGuard("jwt"))
    get(@Request() req): Promise<UserDto> {
        return this.userService.getCurrentUser(req.user.email);
    }
}
