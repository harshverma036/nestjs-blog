import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import { iUser } from './models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: iUser): Promise<iUser> {
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
}
