import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class Query{
    @IsNumber()
    @IsNotEmpty()
    take: number

    @IsNumber()
    @IsNotEmpty()
    skip: number

    @IsString()
    keyword: string
}