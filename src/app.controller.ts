import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './user.service';
import { PostsService } from './post.service';

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

  @Get('users')
  getUsers() {
    return this.usersService.users();
  }

  @Get('user/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.user({ id });
  }

  @Post('user')
  createUser(@Body() data) {
    return this.usersService.create(data);
  }

  @Patch('user/:id')
  updateUser(@Param('id', ParseIntPipe) id, @Body() data) {
    return this.usersService.update(data, id);
  }

  @Delete('user/:id')
  deleteUser(@Param('id', ParseIntPipe) id) {
    return this.usersService.delete(id);
  }

  @Get('posts')
  getPosts() {
    return this.postsService.posts();
  }

  @Get('post/:id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.post({ id });
  }

  @Post('post')
  createPost(@Body() data) {
    return this.postsService.create(data);
  }

  @Patch('post/:id')
  updatePost(@Param('id', ParseIntPipe) id, @Body() data) {
    return this.postsService.update(data, id);
  }

  @Delete('post/:id')
  deletePost(@Param('id', ParseIntPipe) id) {
    return this.postsService.delete(id);
  }
}
