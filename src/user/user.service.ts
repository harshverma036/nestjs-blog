import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { iUser } from './models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async create(user: iUser): Promise<iUser> {
    user.password = await this.authService.hashPassword(user.password);
    return await this.userRepository.save(user);
  }

  async findOne(id: number): Promise<iUser> {
    return await this.userRepository.findOne(id);
  }

  async deleteOne(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }

  async updateOne(id: number, user: iUser): Promise<any> {
    return await this.userRepository.update(id, user);
  }

  async login(user: iUser): Promise<string> {
    const isValid = await this.validateUser(user.email, user.password);
    const jwt = await this.authService.generateJWT(isValid);
    return jwt;
  }

  async validateUser(email: string, password: string): Promise<iUser> {
    const fUser = await this.findByEmail(email);
    if (!fUser) {
      throw new UnauthorizedException();
    }
    const isPassword = await this.authService.comparePassword(
      password,
      fUser.password,
    );
    if (!isPassword) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
    delete fUser.password;
    return fUser;
  }

  async findByEmail(email: string): Promise<iUser> {
    return await this.userRepository.findOne({ email });
  }
}
