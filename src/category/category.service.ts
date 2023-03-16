import generateSlug from 'src/utils/gen-slug';
import { returnCategoryObject } from './return-category.object';
import { PrismaService } from './../prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) { }

    async getAll() {
        return this.prisma.category.findMany({
            select: returnCategoryObject
        })
    }
    async byId(id: number) {
        return this.prisma.category.findUnique({
            where: {
                id
            },

            select: returnCategoryObject
        })
    }
    async update(id: number, dto: CreateCategoryDto) {
        return this.prisma.category.update({
            where: {
                id
            }, data: {
                name: dto.name,
                slug: generateSlug(dto.name)
            }
        })
    }
    async bySlug(slug: string) {
        return this.prisma.category.findUnique({
            where: {
                slug
            }, select: returnCategoryObject
        })
    }
    async delete(id: number) {
        return this.prisma.category.delete({
            where: {
                id
            }
        })
    }
    async create() {
        return this.prisma.category.create({
            data: {
                name: '',
                slug: ''
            }
        })
    }
}
