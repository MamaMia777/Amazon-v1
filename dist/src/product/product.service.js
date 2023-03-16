"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const pagination_service_1 = require("./../pagination/pagination.service");
const get_all_product_dto_1 = require("./dto/get-all.product.dto");
const exceptions_1 = require("@nestjs/common/exceptions");
const return_product_object_1 = require("./return-product.object");
const prisma_service_1 = require("./../prisma.service");
const common_1 = require("@nestjs/common");
const gen_slug_1 = require("../utils/gen-slug");
let ProductService = class ProductService {
    constructor(prisma, paginationService) {
        this.prisma = prisma;
        this.paginationService = paginationService;
    }
    async getAll(dto = {}) {
        const { sort, searchTerm } = dto;
        const prismaSort = [];
        switch (sort) {
            case get_all_product_dto_1.EnumProductSort.LOW_PRICE:
                prismaSort.push({ price: 'asc' });
                break;
            case get_all_product_dto_1.EnumProductSort.HIGH_PRICE:
                prismaSort.push({ price: 'desc' });
                break;
            case get_all_product_dto_1.EnumProductSort.OLDEST:
                prismaSort.push({ createdAt: 'asc' });
                break;
            case get_all_product_dto_1.EnumProductSort.NEWEST:
                prismaSort.push({ createdAt: 'desc' });
                break;
            default:
                break;
        }
        const prismaSearchTermFilter = searchTerm ? {
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
        } : {};
        const { perPage, skip } = this.paginationService.getPagination(dto);
        const products = await this.prisma.product.findMany({
            where: prismaSearchTermFilter,
            orderBy: prismaSort,
            skip,
            take: perPage,
            select: return_product_object_1.productReturnObject
        });
        return {
            products,
            length: await this.prisma.product.count({
                where: prismaSearchTermFilter
            })
        };
    }
    async byId(id) {
        return this.prisma.product.findUnique({
            where: {
                id
            },
            select: return_product_object_1.productReturnObjectFullSet
        });
    }
    async update(id, dto) {
        const { description, image, price, name, categoryId } = dto;
        return this.prisma.product.update({
            where: {
                id
            }, data: {
                description,
                image,
                price,
                name,
                slug: (0, gen_slug_1.default)(dto.name),
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        });
    }
    async bySlug(slug) {
        return this.prisma.product.findUnique({
            where: {
                slug
            }, select: return_product_object_1.productReturnObjectFullSet
        });
    }
    async byCategory(categorySlug) {
        return this.prisma.product.findMany({
            where: {
                category: {
                    slug: categorySlug
                }
            }, select: return_product_object_1.productReturnObjectFullSet
        });
    }
    async getSimilar(id) {
        const currentProduct = await this.byId(id);
        if (!currentProduct)
            throw new exceptions_1.NotFoundException('Product not found!');
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
            select: return_product_object_1.productReturnObject
        });
        return similarProducts;
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
        });
        return product.id;
    }
    async delete(productId) {
        await this.prisma.product.delete({
            where: {
                id: productId,
            },
        });
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pagination_service_1.PaginationService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map