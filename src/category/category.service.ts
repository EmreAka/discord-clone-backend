import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServerService } from 'src/server/server.service';
import { Repository } from 'typeorm';
import CreateCategoryDto from './dto/create-category.dto';
import Category from './entity/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        private serverService: ServerService,
    ) { }

    async add(CreateCategoryDto: CreateCategoryDto){
        // const server = await this.serverService.
    }
}
