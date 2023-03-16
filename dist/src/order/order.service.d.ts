import { PrismaService } from './../prisma.service';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(userId: number): Promise<import(".prisma/client").Order[]>;
}
