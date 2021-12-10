import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { iUser } from './models/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/add')
  async create(@Body() user: iUser): Promise<iUser> {
    return await this.userService.create(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<iUser> {
    return await this.userService.findOne(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<any> {
    return await this.userService.deleteOne(id);
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() user: iUser,
  ): Promise<iUser> {
    return await this.userService.updateOne(id, user);
  }
}
