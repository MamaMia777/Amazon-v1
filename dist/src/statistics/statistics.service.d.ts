import { UserService } from './../user/user.service';
import { PrismaService } from './../prisma.service';
export declare class StatisticsService {
    private prisma;
    private userService;
    constructor(prisma: PrismaService, userService: UserService);
    get(userId: number): Promise<{
        name: string;
        value: number;
    }[]>;
}
