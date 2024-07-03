import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from '../../config/base.entity';
import { Roles } from '../../constants/roles';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: Roles })
  role: Roles;
}
