import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ErrorManager } from 'src/utils/error.manager';
import * as bcrypt from 'bcrypt';
// import * as jwt from 'jsonwebtoken';
import { PayloadToken } from './interfaces/auth.interface';
import { LoginDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login({
    username,
    password,
  }: LoginDTO): Promise<{ access_token: string; user: User }> {
    try {
      const user = await this.usersService.findByUsername(username);
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      }

      const matchingPassword = await bcrypt.compare(password, user.password);
      if (!matchingPassword) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Invalid password',
        });
      }

      const payload: PayloadToken = { role: user.role, sub: user.id };

      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET,
        }),
        user,
      };
    } catch (e) {
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  // async logOut(@Res({ passthrough: true }) res) {
  //   res.cookie('access_token', '', { expires: new Date(Date.now()) });
  //   return {};
  // }

  // public async login(username: string, password: string) {
  //   const user = await this.usersService.findByUsername(username);
  //   if (!user) {
  //     throw new ErrorManager({
  //       type: 'BAD_REQUEST',
  //       message: 'User not found',
  //     });
  //   }

  //   const matchingPassword = await bcrypt.compare(password, user.password);
  //   if (!matchingPassword) {
  //     throw new ErrorManager({
  //       type: 'BAD_REQUEST',
  //       message: 'Invalid password',
  //     });
  //   }

  //   const payload: PayloadToken = { role: user.role, sub: user.id };

  //   return {
  //     access_token: this.signJWT({
  //       payload,
  //       secret: process.env.JWT_SECRET,
  //       expires: '1h',
  //     }),
  //     user,
  //   };
  // }

  // public async signJWT({
  //   payload,
  //   secret,
  //   expires,
  // }: {
  //   payload: jwt.JwtPayload;
  //   secret: string;
  //   expires: number | string;
  // }) {
  //   return jwt.sign(payload, secret, { expiresIn: expires });
  // }

  // public async generateJWT(user: User): Promise<any> {
  //   const getUser = await this.usersService.findOne(user.id);

  //   const payload: PayloadToken = {
  //     role: getUser.role,
  //     sub: getUser.id,
  //   };

  //   return {
  //     accessToken: this.signJWT({
  //       payload,
  //       secret: process.env.JWT_SECRET,
  //       expires: '1h',
  //     }),
  //     user,
  //   };
  // }
}
