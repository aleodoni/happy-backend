import Image from '../models/Image';

export type ImageViewRender = {
  id: number;
  url: string;
};

export default {
  render(image: Image): ImageViewRender {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]): ImageViewRender[] {
    return images.map(image => this.render(image));
  },
};
