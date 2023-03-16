import { PrismaService } from './../prisma.service';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate({ id }: Pick<User, 'id'>): Promise<User>;
}
export {};
