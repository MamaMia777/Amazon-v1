import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
// import { ConfigService } from '@nestjs/config/dist';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate({ id }: Pick<User, 'id'>) {
        return this.prisma.user.findUnique({
            where: {
                id: +id
            }
        })
    }

}