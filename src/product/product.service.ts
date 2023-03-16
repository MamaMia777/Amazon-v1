import { Prisma } from '@prisma/client';
import { PaginationService } from './../pagination/pagination.service';
import { EnumProductSort, GetAllProductsDto } from './dto/get-all.product.dto';
import { ProductDto } from './dto/product.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { productReturnObject, productReturnObjectFullSet } from './return-product.object';
import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import generateSlug from 'src/utils/gen-slug';

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService
    ) { }

    async getAll(dto: GetAllProductsDto = {}) {

        const { sort, searchTerm } = dto
        const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

        switch (sort) {

            case EnumProductSort.LOW_PRICE:
                prismaSort.push({ price: 'asc' })
                break
            case EnumProductSort.HIGH_PRICE:
                prismaSort.push({ price: 'desc' })
                break
            case EnumProductSort.OLDEST:
                prismaSort.push({ createdAt: 'asc' })
                break
            case EnumProductSort.NEWEST:
                prismaSort.push({ createdAt: 'desc' })
                break
            default:
                break
        }

        const prismaSearchTermFilter: Prisma.ProductWhereInput
            = searchTerm ? {
                OR: [
                    {
                        category: {
                            name: {
                                contains: searchTerm,
                            }
                        }
                    },
                    {
                        name: {
                            contains: searchTerm,
                        },

                    },
                    {
                        description: {
                            contains: searchTerm
                        }
                    }
                ]
            } : {}

        const { perPage, skip } = this.paginationService.getPagination(dto)

        const products = await this.prisma.product.findMany({
            where: prismaSearchTermFilter,
            orderBy: prismaSort,
            skip,
            take: perPage,
            select: productReturnObject

        })

        return {
            products,
            length: await this.prisma.product.count({
                where: prismaSearchTermFilter
            })
        }
    }
    async byId(id: number) {
        return this.prisma.product.findUnique({
            where: {
                id
            },
            select: productReturnObjectFullSet
        })
    }
    async update(id: number, dto: ProductDto) {
        const { description, image, price, name, categoryId } = dto
        return this.prisma.product.update({
            where: {
                id
            }, data: {
                description,
                image,
                price,
                name,
                slug: generateSlug(dto.name),
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        })
    }
    async bySlug(slug: string) {
        return this.prisma.product.findUnique({
            where: {
                slug
            }, select: productReturnObjectFullSet
        })
    }

    async byCategory(categorySlug: string) {
        return this.prisma.product.findMany({
            where: {
                category: {
                    slug: categorySlug
                }
            }, select: productReturnObjectFullSet
        })
    }

    async getSimilar(id: number) {
        const currentProduct = await this.byId(id)
        if (!currentProduct) throw new NotFoundException('Product not found!')

        const similarProducts = await this.prisma.product.findMany({
            where: {
                category: {
                    name: currentProduct.category.name
                },
                NOT: {
                    id: currentProduct.id
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: productReturnObject
        })
        return similarProducts
    }


    async create() {
        const product = await this.prisma.product.create({
            data: {
                description: '',
                name: '',
                price: 0,
                slug: '',
                image: '',
            }
        })
        return product.id
    }

    async delete(productId: number) {
        await this.prisma.product.delete({
            where: {
                id: productId,
            },

        });

    }
}
