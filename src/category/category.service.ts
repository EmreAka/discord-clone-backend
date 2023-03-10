import { ForbiddenException, Injectable } from '@nestjs/common';
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

    async add(createCategoryDto: CreateCategoryDto, userId: number) {
        const server = await this.serverService.getById(createCategoryDto.serverId);

        if (server.founder.id !== userId) {
            throw new ForbiddenException("You cannot create a category for the server that doesn't belong to you!")
        }

        let category = this.categoryRepository.create(createCategoryDto)
        category.server = server

        const categoryCreated = await this.categoryRepository.save(category);
        return { id: categoryCreated.id, name: categoryCreated.name }
    }

    getById(id: number) {
        return this.categoryRepository.findOne({ where: { id: id } })
    }

    getByIdWithDetails(id: number) {
        return this.categoryRepository.findOne({
            where: { id: id },
            relations: {
                server: {
                    founder: true
                }
            }
        })
    }

    async getAllByServerId(serverId: number, userId: number) {
        const server = await this.serverService.getAllByUserId(userId);
        const x = server.find(s => s.id === serverId)

        if (x == null) {
            throw new ForbiddenException();
        }

        return this.categoryRepository.find({
            where: {
                server: { id: serverId },
            },
            relations: {
                channels: true
            }
        })
    }
}
