import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repository';

/**
 * Database Query Execution Example
 */
@Injectable()
export class DatabaseService {
  constructor(private readonly repo: UsersRepository) {}
  async findByUserId(userId: string) {
    return await this.repo.findById(userId);
  }
}
