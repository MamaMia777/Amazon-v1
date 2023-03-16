import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { UserDto } from './user.dto';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async byId(id: number, selectObject: Prisma.UserSelect = {}) {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },

            select: {
                id: true,
                email: true,
                name: true,
                avatarPath: true,
                password: false,
                phone: true,
                // @ts-ignore
                favorites: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true,
                        slug: true
                    }
                },
                ...selectObject
            },


        })

        if (!user) throw new Error('User not found')
        return user
    }

    async updateProfile(id: number, dto: UserDto) {
        const isSameUser = await this.prisma.user.findUnique({
            where: { email: dto.email }
        })

        if (isSameUser && id != isSameUser.id) throw new BadRequestException('Email aalready in use')

        const user = await this.byId(id)

        return this.prisma.user.update({
            where: {
                id
            }, data: {
                email: dto.email,
                name: dto.name,
                avatarPath: dto.avatarPath,
                phone: dto.phone,
                password: dto.password ? await hash(dto.password) : user.password
            }
        })
    }
    async toggleFavorite(id: number, productId: number) {
        const user = await this.byId(id)
        if (!user) throw new NotFoundException('User not found')
        const productInList = user.favorites.find(product => product.id === productId)

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
        })
        return "Super!"
    }
}
