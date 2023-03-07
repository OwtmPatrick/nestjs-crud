import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { User } from '../entity/user.entity';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private serv: UsersService) {}

  @Get()
  public async findAll() {
    return await this.serv.findAll();
  }

  @Get('/:id')
  public async findOne(@Param('id') id: string) {
    const user: User | null = await this.serv.findOne(id);

    if (user) return user;

    return 'Unable to find that user';
  }

  @Post('/create')
  async create(@Body() newUser: User) {
    await this.serv.create(newUser);

    return 'User created successfully';
  }

  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() body: User) {
    await this.serv.update(id, body);

    return 'User updated successfully';
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    await this.serv.delete(id);

    return 'User deleted successfully';
  }
}
