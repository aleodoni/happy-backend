import * as Yup from 'yup';

type ImageShape = {
  path: string;
};

type Data = {
  name: string;
  latitude: string;
  longitude: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: ImageShape[];
};

const schema = Yup.object().shape({
  name: Yup.string().required(),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
  about: Yup.string().required().max(300),
  instructions: Yup.string().required(),
  opening_hours: Yup.string().required(),
  open_on_weekends: Yup.boolean().required(),
  images: Yup.array(
    Yup.object<ImageShape>().shape({
      path: Yup.string().required(),
    }),
  ),
});

export default {
  async validate(data: Data): Promise<void> {
    await schema.validate(data, {
      abortEarly: false,
    });
  },

  cast(data: Data): any {
    const dataCasted = schema.cast(data, {
      abortEarly: false,
    });

    return dataCasted;
  },
};
