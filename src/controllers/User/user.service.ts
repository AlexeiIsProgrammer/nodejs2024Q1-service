import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User } from './interfaces';
import { DbService } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}

  getAll(): User[] {
    return this.db.getAllUsers();
  }

  getById(id: string): User {
    return this.db.getUserById(id);
  }

  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    return this.db.createUser(createUserDto);
  }

  update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Omit<User, 'password'> {
    return this.db.updateUser(id, updatePasswordDto);
  }

  delete(id: string): void {
    return this.db.deleteUser(id);
  }
}
