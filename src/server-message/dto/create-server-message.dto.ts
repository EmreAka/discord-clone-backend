import { IsEmpty, IsNotEmpty, IsString } from "class-validator"

export class CreateServerMessageDto{
    @IsString()
    @IsNotEmpty()
    message: string

    @IsNotEmpty()
    serverId: number

    @IsNotEmpty()
    channelId: number
}