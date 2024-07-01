import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Level } from 'src/constants/level';
import { Position } from 'src/constants/position';

export class ProfileDto {
  @ApiProperty({
    description: 'Name',
    example: 'John',
    required: true,
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Lastname',
    example: 'Doe',
    required: true,
  })
  @IsString()
  lastname?: string;

  @ApiProperty({
    description: 'Age',
    example: 25,
    required: true,
  })
  @IsNumber()
  age?: number;

  @ApiProperty({
    description: 'Telephone number',
    example: '666303030',
    required: true,
  })
  @IsString()
  telephone_number?: string;

  @ApiProperty({
    description: 'Level',
    example: '4,00',
    required: false,
  })
  level?: Level;

  @ApiProperty({
    description: 'Position',
    example: 'BOTH',
    required: false,
  })
  position?: Position;
}

export class CreateProfileDto {
  @ApiProperty({
    description: 'Name',
    example: 'John',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Lastname',
    example: 'Doe',
    required: true,
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'Age',
    example: 25,
    required: true,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    description: 'Telephone number',
    example: '666303030',
    required: true,
  })
  @IsString()
  telephone_number: string;

  @ApiProperty({
    description: 'Level',
    example: '4,00',
    required: true,
  })
  level: Level;

  @ApiProperty({
    description: 'Position',
    example: 'BOTH',
    required: true,
  })
  position: Position;
}

export class UpdateProfileDto extends PartialType(ProfileDto) {}
