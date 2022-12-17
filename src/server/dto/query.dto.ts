import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class Query{
    @IsNumber()
    @IsNotEmpty()
    page: number

    @IsNumber()
    @IsNotEmpty()
    pageSize: number

    @IsString()
    keyword: string
}