import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from './generated/prisma/client';
import { UserWhereUniqueInput } from './generated/prisma/models';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async users(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async user(id: UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where: id });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async update(data: Prisma.UserUpdateInput, id: number) {
    return this.prisma.user.update({
      data: data,
      where: { id },
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
