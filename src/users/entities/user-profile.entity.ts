import { BaseEntity } from '../../config/base.entity';
import { User } from './user.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { Entity, OneToOne } from 'typeorm';

@Entity({ name: 'user-profile' })
export class UserProfile extends BaseEntity {
  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
