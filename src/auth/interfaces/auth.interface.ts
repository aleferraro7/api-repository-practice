import { Roles } from 'src/constants/roles';

export interface PayloadToken {
  sub: string;
  role: Roles;
}
