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
exports.AuthService = void 0;
const prisma_service_1 = require("./../prisma.service");
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const faker_1 = require("@faker-js/faker");
const argon2_1 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const common_2 = require("@nestjs/common");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async register(dto) {
        const oldUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        if (oldUser)
            throw new exceptions_1.BadRequestException('User already exists');
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: faker_1.faker.name.firstName(),
                avatarPath: faker_1.faker.image.avatar(),
                phone: faker_1.faker.phone.number('+371 ###-###-###'),
                password: await (0, argon2_1.hash)(dto.password)
            }
        });
        const tokens = await this.issueTokens(user.id);
        return Object.assign({ user: this.returnUserFields(user) }, tokens);
    }
    async getNewTokens(refreshToken) {
        const result = await this.jwt.verifyAsync(refreshToken);
        if (!result)
            throw new common_2.UnauthorizedException('Invalid refresh token');
        const user = await this.prisma.user.findUnique({
            where: {
                id: result.id
            }
        });
        const tokens = await this.issueTokens(user.id);
        return Object.assign({ user: this.returnUserFields(user) }, tokens);
    }
    async login(dto) {
        const user = await this.validateUser(dto);
        const tokens = await this.issueTokens(user.id);
        return Object.assign({ user: this.returnUserFields(user) }, tokens);
    }
    async issueTokens(userId) {
        const data = { id: userId };
        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h'
        });
        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d'
        });
        return { accessToken, refreshToken };
    }
    returnUserFields(user) {
        return {
            id: user.id,
            email: user.email
        };
    }
    async validateUser(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        if (!user)
            throw new exceptions_1.NotFoundException('User not found');
        const isValid = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isValid)
            throw new common_2.UnauthorizedException('Invalid password');
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map