import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Post, Prisma } from './generated/prisma/client';
import { PostWhereUniqueInput } from './generated/prisma/models';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async posts(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async post(id: PostWhereUniqueInput) {
    return this.prisma.post.findUnique({ where: id });
  }

  async create(data: Prisma.PostCreateInput) {
    return this.prisma.post.create({ data });
  }

  async update(data: Prisma.PostUpdateInput, id: number) {
    return this.prisma.post.update({
      data: data,
      where: { id },
    });
  }

  async delete(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
