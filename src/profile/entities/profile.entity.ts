import { BaseEntity } from '../../config/base.entity';
import { Level } from '../../constants/level';
import { Position } from '../../constants/position';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile extends BaseEntity {
  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  telephone_number: string;

  @Column()
  level: Level;

  @Column()
  position: Position;
}
