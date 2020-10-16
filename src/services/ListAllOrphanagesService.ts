import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanage';

class ListAllOrphananesService {
  public async execute(): Promise<Orphanage[]> {
    const orphanageRepository = getRepository(Orphanage);

    const orphanages = await orphanageRepository.find({
      relations: ['images'],
    });

    return orphanages;
  }
}

export default ListAllOrphananesService;
