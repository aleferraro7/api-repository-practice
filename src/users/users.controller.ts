import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO, UserDTO } from './dto/user.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
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
  @PublicAccess()
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
