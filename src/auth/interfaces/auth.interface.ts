import { Roles } from 'src/constants/roles';

export interface PayloadToken {
  sub: string;
  role: Roles;
}

export interface AuthTokenResult {
  role: string;
  sub: string;
  iat: number;
}

export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}
