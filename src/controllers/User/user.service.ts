import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User } from './interfaces';
import { DbService } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}

  async getAll(): Promise<User[]> {
    return this.db.getAllUsers();
  }

  async getById(id: string): Promise<User> {
    return this.db.getUserById(id);
  }

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.db.createUser(createUserDto);
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    return this.db.updateUser(id, updatePasswordDto);
  }

  async delete(id: string): Promise<Omit<User, 'password'>> {
    return this.db.deleteUser(id);
  }
}
