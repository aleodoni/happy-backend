import Orphanage from '../models/Orphanage';
import imagesView, { ImageViewRender } from './images_view';

export type OrphanageViewRender = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: ImageViewRender[];
};

export default {
  render(orphanage: Orphanage): OrphanageViewRender {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imagesView.renderMany(orphanage.images),
    };
  },

  renderMany(orphanages: Orphanage[]): OrphanageViewRender[] {
    return orphanages.map(orphanage => this.render(orphanage));
  },
};
