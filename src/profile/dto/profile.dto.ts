import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Level } from 'src/constants/level';
import { Position } from 'src/constants/position';

export class ProfileDTO {
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
    required: false,
    nullable: true,
  })
  @IsString()
  lastname?: string;

  @ApiProperty({
    description: 'Age',
    example: 25,
    required: false,
    nullable: true,
  })
  @IsNumber()
  age?: number;

  @ApiProperty({
    description: 'Telephone number',
    example: '666303030',
    required: false,
    nullable: true,
  })
  @IsString()
  telephone_number?: string;

  @ApiProperty({
    description: 'Level',
    example: '4,00',
    required: false,
    nullable: true,
  })
  level?: Level;

  @ApiProperty({
    description: 'Position',
    example: 'BOTH',
    required: false,
    nullable: true,
  })
  position?: Position;
}

export class CreateProfileDTO {
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
    required: false,
    nullable: true,
  })
  @IsString()
  lastname?: string;

  @ApiProperty({
    description: 'Age',
    example: 25,
    required: false,
    nullable: true,
  })
  @IsNumber()
  age?: number;

  @ApiProperty({
    description: 'Telephone number',
    example: '666303030',
    required: false,
    nullable: true,
  })
  @IsString()
  telephone_number?: string;

  @ApiProperty({
    description: 'Level',
    example: '4,00',
    required: false,
    nullable: true,
  })
  level?: Level;

  @ApiProperty({
    description: 'Position',
    example: 'BOTH',
    required: false,
    nullable: true,
  })
  position?: Position;
}

export class UpdateProfileDTO extends PartialType(ProfileDTO) {}
