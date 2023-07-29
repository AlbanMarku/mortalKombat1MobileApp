import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'd3ix1agf',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-07-29',
});

export const urlFor = (source) => {
  const builder = imageUrlBuilder(client);
  return builder.image(source);
};
