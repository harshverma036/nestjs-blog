import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { iUser } from 'src/user/models/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJWT(user: iUser): Promise<string> {
    return await this.jwtService.sign({ user });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(
    password: string,
    hash: string,
  ): Promise<any | boolean> {
    return await bcrypt.compare(password, hash);
  }
}
