import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.login(email, pass);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = user
    return {
      accessToken: this.jwtService.sign(payload),
      ussername : user.username,
      email : user.email,
      roles : user.roles,
      id : user.id
    };
  }

  async verifyToken(token: string): Promise<boolean> {
    const user = await this.jwtService.verify(token);
    return user;
   }
}