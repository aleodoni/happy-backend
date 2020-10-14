import { Request, Response } from 'express';

import CreateOrphanageService from '../services/CreateOrphanageService';

import orphanageView from '../views/orphanages_view';

class OrphanagesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    const createOrphanage = new CreateOrphanageService();

    const orphanage = await createOrphanage.execute(data);

    return response.status(201).json(orphanageView.render(orphanage));
  }
}

export default new OrphanagesController();
