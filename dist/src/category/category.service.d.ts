import { PrismaService } from './../prisma.service';
import { CreateCategoryDto } from './category.dto';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        createdAt?: Date;
        updatedAt?: Date;
        name?: string;
        slug?: string;
        id?: number;
        _count?: import(".prisma/client").Prisma.CategoryCountOutputType;
        products?: import(".prisma/client").Product[];
    }[]>;
    byId(id: number): Promise<{
        createdAt?: Date;
        updatedAt?: Date;
        name?: string;
        slug?: string;
        id?: number;
        _count?: import(".prisma/client").Prisma.CategoryCountOutputType;
        products?: import(".prisma/client").Product[];
    }>;
    update(id: number, dto: CreateCategoryDto): Promise<import(".prisma/client").Category>;
    bySlug(slug: string): Promise<{
        createdAt?: Date;
        updatedAt?: Date;
        name?: string;
        slug?: string;
        id?: number;
        _count?: import(".prisma/client").Prisma.CategoryCountOutputType;
        products?: import(".prisma/client").Product[];
    }>;
    delete(id: number): Promise<import(".prisma/client").Category>;
    create(): Promise<import(".prisma/client").Category>;
}
