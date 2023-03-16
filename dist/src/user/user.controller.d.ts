import { UserService } from './user.service';
import { UserDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(id: number): Promise<{
        id: number;
        createdAt?: Date;
        updatedAt?: Date;
        email: string;
        password: string;
        name: string;
        avatarPath: string;
        phone: string;
        orders?: import(".prisma/client").Order[];
        reviews?: import(".prisma/client").Review[];
        favorites: import(".prisma/client").Product[];
        _count?: import(".prisma/client").Prisma.UserCountOutputType;
    }>;
    getNewTokens(id: number, dto: UserDto): Promise<import(".prisma/client").User>;
    toggleFavorite(productId: number, id: number): Promise<string>;
}
