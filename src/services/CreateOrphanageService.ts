import { getRepository } from 'typeorm';

import orphanageValidation from '../validation/orphanage_validation';
import AppError from '../errors/AppError';

import Orphanage from '../models/Orphanage';

type ImageRequest = {
  path: string;
};

type Request = {
  name: string;
  latitude: string;
  longitude: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: ImageRequest[];
};

class CreateOrphanageService {
  public async execute(data: Request | undefined): Promise<Orphanage> {
    const orphanageRepository = getRepository(Orphanage);

    if (!data) {
      throw new AppError('Invalid form data');
    }

    await orphanageValidation.validate(data);

    const castData = orphanageValidation.cast(data) as Orphanage;

    const orphanage = orphanageRepository.create(castData);

    await orphanageRepository.save(orphanage);

    return orphanage;
  }
}

export default CreateOrphanageService;
