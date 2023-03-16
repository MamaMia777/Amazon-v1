import { ReviewDto } from './category.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ReviewService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        createdAt?: Date;
        updatedAt?: Date;
        user?: import(".prisma/client").User;
        id?: number;
        userId?: number;
        rating?: number;
        text?: string;
        product?: import(".prisma/client").Product;
        productId?: number;
    }[]>;
    create(userId: number, dto: ReviewDto, productId: number): Promise<import(".prisma/client").Review>;
    averageRating(productId: number): Promise<{
        rating: number;
    }>;
}
