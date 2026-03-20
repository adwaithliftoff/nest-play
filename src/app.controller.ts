import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
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
}
