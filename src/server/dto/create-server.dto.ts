import { isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export default class CreateServerDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    imagePath:string

    @IsString()
    @IsNotEmpty()
    description: string
}