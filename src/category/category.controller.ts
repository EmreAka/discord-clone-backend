import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/create-category.dto';

@Controller('category')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    add(@Body() createCategoryDto: CreateCategoryDto, @Request() req){
        const userId = req.user.userId
        return this.categoryService.add(createCategoryDto, userId); 
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id:number){
        return this.categoryService.getById(id);
    }
    
    @Get('')
    getByServerId(@Query('serverId', ParseIntPipe) serverId: number){
        return this.categoryService.getByServerId(serverId);
    }
}
