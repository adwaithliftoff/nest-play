import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './user.service';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PostsService } from './post.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, UsersService, PrismaService, PostsService],
})
export class AppModule {}
