import Image from '../models/Image';

export type ImageViewRender = {
  id: number;
  url: string;
};

export default {
  render(image: Image): ImageViewRender {
    return {
      id: image.id,
      url: `http://192.168.100.142:3333/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]): ImageViewRender[] {
    return images.map(image => this.render(image));
  },
};
