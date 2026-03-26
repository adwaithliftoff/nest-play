import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from './generated/prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map(({ password, ...rest }) => rest);
  }

  async findOne(
    id: Prisma.UserWhereUniqueInput,
  ): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({ where: id });
    if (!user) return null;
    const { password, ...rest } = user;
    return rest;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.prisma.user.create({
      data: { ...data, role: 'USER' },
    });
    const { password, ...rest } = user;
    return rest;
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<UserResponseDto> {
    const { where, data } = params;
    const user = await this.prisma.user.update({ where, data });
    const { password, ...rest } = user;
    return rest;
  }

  async delete(id: number): Promise<UserResponseDto> {
    const user = await this.prisma.user.delete({ where: { id } });
    const { password, ...rest } = user;
    return rest;
  }
}
