import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './user.service';
import { PostsService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { LoggingInterceptor } from './logging.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { RolesGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';
import { Role } from './generated/prisma/enums';
import { AuthGuard } from './auth/auth.guard';
import { OwnershipGuard } from './auth/ownership.guard';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('users')
  async getUsers(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard, OwnershipGuard)
  @Get('users/:id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto | null> {
    return this.usersService.findOne({ id });
  }

  @Post('users')
  async createUser(@Body() data: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(data);
  }

  @UseGuards(AuthGuard, OwnershipGuard)
  @Patch('users/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update({ where: { id }, data });
  }

  @UseGuards(AuthGuard, OwnershipGuard)
  @Delete('users/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return this.usersService.delete(id);
  }

  @Get('posts')
  async getPosts() {
    return this.postsService.posts();
  }

  @Get('posts/:id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.post({ id });
  }

  @Post('posts')
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Patch('posts/:id')
  async updatePost(@Param('id', ParseIntPipe) id, @Body() data) {
    return this.postsService.update(data, id);
  }

  @Delete('posts/:id')
  async deletePost(@Param('id', ParseIntPipe) id) {
    return this.postsService.delete(id);
  }
}
