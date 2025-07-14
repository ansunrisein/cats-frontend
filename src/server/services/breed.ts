import { Breed } from "../models/breed";

export const getBreeds = async (): Promise<Breed[]> => {
  const response = await fetch(`https://api.thecatapi.com/v1/breeds`);

  return response.json();
};
