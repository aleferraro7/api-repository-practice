import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDTO, UserDTO } from './dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  public async create(body: UserDTO): Promise<User> {
    try {
      return await this.usersRepository.save(body);
    } catch (e) {
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this.usersRepository.find();
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Users not found',
        });
      }
      return users;
    } catch (e) {
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async findOne(id: string): Promise<User> {
    try {
      const user: User = await this.usersRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      }
      return user;
    } catch (e) {
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async update(
    id: string,
    body: UpdateUserDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.usersRepository.update(id, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not updated',
        });
      }
      return user;
    } catch (e) {
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async delete(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.usersRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not deleted',
        });
      }
      return user;
    } catch (e) {
      throw ErrorManager.createSignatureError(e.message);
    }
  }
}
