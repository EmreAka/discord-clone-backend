import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    add(@Body() createCategoryDto: CreateCategoryDto, @Request() req){
        const userId = req.user.userId
        return this.categoryService.add(createCategoryDto, userId); 
    }
}
