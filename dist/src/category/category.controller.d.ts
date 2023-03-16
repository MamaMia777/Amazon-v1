import { CreateCategoryDto } from './category.dto';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAll(): Promise<{
        createdAt?: Date;
        updatedAt?: Date;
        name?: string;
        slug?: string;
        id?: number;
        _count?: import(".prisma/client").Prisma.CategoryCountOutputType;
        products?: import(".prisma/client").Product[];
    }[]>;
    getBySlug(slug: string): Promise<{
        createdAt?: Date;
        updatedAt?: Date;
        name?: string;
        slug?: string;
        id?: number;
        _count?: import(".prisma/client").Prisma.CategoryCountOutputType;
        products?: import(".prisma/client").Product[];
    }>;
    getById(id: string): Promise<{
        createdAt?: Date;
        updatedAt?: Date;
        name?: string;
        slug?: string;
        id?: number;
        _count?: import(".prisma/client").Prisma.CategoryCountOutputType;
        products?: import(".prisma/client").Product[];
    }>;
    update(categoryId: string, dto: CreateCategoryDto): Promise<import(".prisma/client").Category>;
    create(): Promise<import(".prisma/client").Category>;
    delete(categoryId: string): Promise<import(".prisma/client").Category>;
}
