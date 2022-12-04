import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    async add(createCategoryDto: CreateCategoryDto, userId: number){
        const server = await this.serverService.getById(createCategoryDto.serverId);

        if (server.founder.id !== userId) {
            throw new UnauthorizedException("You cannot create a category for the server that doesn't belong to you!")
        }

        let category = this.categoryRepository.create(createCategoryDto)
        category.server = server

        const categoryCreated = await this.categoryRepository.save(category);
        return { id: categoryCreated.id, name: categoryCreated.name }
    }
}
