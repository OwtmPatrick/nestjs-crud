import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async findOne(id: string): Promise<User | null> {
    try {
      const user = await this.repo.findOneBy({ id });

      return user;
    } catch (e) {
      return null;
    }
  }

  async create(user: User): Promise<User> {
    return this.repo.save(this.repo.create(user));
  }

  async update(id: string, data: User): Promise<any> {
    return this.repo
      .createQueryBuilder()
      .update()
      .set({
        name: data.name,
        age: data.age,
      })
      .where('id = :id', { id })
      .execute();
  }

  delete(id: string): Promise<any> {
    return this.repo
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }
}
