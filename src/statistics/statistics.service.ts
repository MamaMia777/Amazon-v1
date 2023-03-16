import { UserService } from './../user/user.service';
import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService
    ) { }

    async get(userId: number) {
        const user = await this.userService.byId(userId, {
            orders: {
                select: {
                    items: true
                }
            },
            reviews: true,
        })

        return [
            {
                name: 'Orders',
                value: user.orders.length
            },
            {
                name: 'Reviews',
                value: user.reviews.length,
            },
            {
                name: 'Favorites',
                value: user.favorites.length
            },
            {
                name: 'Total amount',
                value: 777
            },
        ]

    }
}
