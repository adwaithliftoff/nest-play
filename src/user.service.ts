import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { User, Prisma } from "./generated/prisma/client";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async users(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
}
