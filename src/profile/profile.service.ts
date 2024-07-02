import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProfileDTO, UpdateProfileDTO } from './dto/profile.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  public async create(body: ProfileDTO): Promise<Profile> {
    try {
      return await this.profilesRepository.save(body);
    } catch (e) {
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async findAll(): Promise<Profile[]> {
    try {
      const profiles: Profile[] = await this.profilesRepository.find();
      if (profiles.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Profiles not found',
        });
      }
      return profiles;
    } catch (e) {
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async findOne(id: string): Promise<Profile> {
    try {
      const profile: Profile = await this.profilesRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();

      if (!profile) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Profile not found',
        });
      }
      return profile;
    } catch (e) {
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async update(
    id: string,
    body: UpdateProfileDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      const profile: UpdateResult = await this.profilesRepository.update(
        id,
        body,
      );
      if (profile.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Profile not updated',
        });
      }
      return profile;
    } catch (e) {
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async delete(id: string): Promise<DeleteResult | undefined> {
    try {
      const profile: DeleteResult = await this.profilesRepository.delete(id);
      if (profile.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Profile not deleted',
        });
      }
      return profile;
    } catch (e) {
      throw ErrorManager.createSignatureError(e.message);
    }
  }
}
