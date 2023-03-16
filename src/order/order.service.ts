import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) { }

    async getAll(userId: number) {
        return this.prisma.order.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }
}
