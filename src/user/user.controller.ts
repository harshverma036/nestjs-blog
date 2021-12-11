import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request
} from '@nestjs/common';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from './models/user.entity';
import { iUser } from './models/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/add')
  async create(@Body() user: iUser): Promise<iUser> {
    const nUser = await this.userService.create(user);
    delete nUser.password;
    return nUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<iUser> {
    return await this.userService.findOne(id);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Post('/login')
  async login(@Body() user: iUser): Promise<any> {
    const jwt = await this.userService.login(user);
    return { token: jwt };
  }
}
