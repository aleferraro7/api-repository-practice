import { AuthTokenResult, IUseToken } from 'src/auth/interfaces/auth.interface';

const jwtService = require('@nestjs/jwt');

export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = jwtService.decode(token) as AuthTokenResult;

    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: true,
    };
  } catch (e) {
    return 'invalid token';
  }
};
