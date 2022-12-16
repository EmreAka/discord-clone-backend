import { IsNotEmpty, IsString } from "class-validator"

export class CreateChannelDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    // @IsNotEmpty()
    // serverId: number

    @IsNotEmpty()
    categoryId: number
}