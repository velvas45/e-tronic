import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "fa8vrx9s",
  dataset: "production",
  apiVersion: "2022-06-17",
  useCdn: true,
  token: process.env.API_TOKEN_SANITY,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
