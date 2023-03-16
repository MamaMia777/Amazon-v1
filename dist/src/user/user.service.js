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
exports.UserService = void 0;
const exceptions_1 = require("@nestjs/common/exceptions");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const argon2_1 = require("argon2");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async byId(id, selectObject = {}) {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
            select: Object.assign({ id: true, email: true, name: true, avatarPath: true, password: false, phone: true, favorites: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true,
                        slug: true
                    }
                } }, selectObject),
        });
        if (!user)
            throw new Error('User not found');
        return user;
    }
    async updateProfile(id, dto) {
        const isSameUser = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (isSameUser && id != isSameUser.id)
            throw new exceptions_1.BadRequestException('Email aalready in use');
        const user = await this.byId(id);
        return this.prisma.user.update({
            where: {
                id
            }, data: {
                email: dto.email,
                name: dto.name,
                avatarPath: dto.avatarPath,
                phone: dto.phone,
                password: dto.password ? await (0, argon2_1.hash)(dto.password) : user.password
            }
        });
    }
    async toggleFavorite(id, productId) {
        const user = await this.byId(id);
        if (!user)
            throw new exceptions_1.NotFoundException('User not found');
        const productInList = user.favorites.find(product => product.id === productId);
        await this.prisma.user.update({
            where: {
                id: user.id
            }, data: {
                favorites: {
                    [productInList ? 'disconnect' : 'connect']: {
                        id: productId
                    }
                }
            }
        });
        return "Super!";
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map