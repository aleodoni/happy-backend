import { Request, Response } from 'express';

import CreateOrphanageService from '../services/CreateOrphanageService';
import ListAllOrphanagesService from '../services/ListAllOrphanagesService';
import GetOrphanageService from '../services/GetOrphanageService';

import orphanageView from '../views/orphanages_view';

class OrphanagesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getOrphanageService = new GetOrphanageService();

    const orphanage = await getOrphanageService.execute({ id });

    return response.status(200).json(orphanageView.render(orphanage));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllOrphanagesService = new ListAllOrphanagesService();

    const orphanages = await listAllOrphanagesService.execute();

    return response.status(200).json(orphanageView.renderMany(orphanages));
  }

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
