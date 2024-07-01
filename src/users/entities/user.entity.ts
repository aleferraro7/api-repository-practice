import { Expose } from 'class-transformer';
import { BaseEntity } from '../../config/base.entity';
import { Roles } from '../../constants/roles';
import { Profile } from '../../profile/entities/profile.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { UserProfile } from './user-profile.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Roles })
  roles: Roles;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.profile)
  profile: Profile;
}
