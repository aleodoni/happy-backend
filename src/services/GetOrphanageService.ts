import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Orphanage from '../models/Orphanage';

type Request = {
  id: string;
};

class GetOrphanageService {
  public async execute({ id }: Request): Promise<Orphanage> {
    const orphanageRepository = getRepository(Orphanage);

    const orphanage = await orphanageRepository.findOne(Number(id), {
      relations: ['images'],
    });

    if (!orphanage) {
      throw new AppError('Orfanato não encontrado.');
    }

    return orphanage;
  }
}

export default GetOrphanageService;
