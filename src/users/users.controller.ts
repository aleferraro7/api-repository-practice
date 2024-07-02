import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO, UserDTO } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  public async register(@Body() body: UserDTO) {
    return this.usersService.create(body);
  }

  @Get()
  public async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDTO,
  ) {
    return this.usersService.update(id, updateUser);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
