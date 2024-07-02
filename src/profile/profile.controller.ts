import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDTO, UpdateProfileDTO } from './dto/profile.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('register')
  public async register(@Body() body: ProfileDTO) {
    return this.profileService.create(body);
  }

  @Get()
  public async findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUser: UpdateProfileDTO,
  ) {
    return this.profileService.update(id, updateUser);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.profileService.delete(id);
  }
}
