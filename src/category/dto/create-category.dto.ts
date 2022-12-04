import { isNotEmpty, IsNotEmpty, IsString } from "class-validator"

export default class CreateCategoryDto{
    @IsString()
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    serverId:number
}