import { ReviewDto } from './category.dto';
import { ReviewService } from './review.service';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
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
    createReview(productId: string, dto: ReviewDto, id: number): Promise<import(".prisma/client").Review>;
    getAverageByProduct(productId: string): Promise<{
        rating: number;
    }>;
}
