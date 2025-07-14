import { Cat } from "../models/cat";

export type GetCatsApiParams = {
  limit: number;
  breed: string | null;
};

export const getCats = async (params: GetCatsApiParams): Promise<Cat[]> => {
  const searchParams = new URLSearchParams({
    limit: String(params.limit),
  });

  if (params.breed) {
    searchParams.set("breed_ids", params.breed);
  }

  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?${searchParams.toString()}`,
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const cats: Cat[] = await response.json();

  return cats.map((cat) => ({
    ...cat,
    age: getRandomAge(1, 10),
    description: DESCRIPTION,
    name: getRandomName(),
  }));
};

export const getCat = async (id: string): Promise<Cat> => {
  const response = await fetch(`https://api.thecatapi.com/v1/images/${id}`);

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const cat: Cat = await response.json();

  return {
    ...cat,
    age: getRandomAge(1, 10),
    description: DESCRIPTION,
    name: getRandomName(),
  };
};

// Mock data
const getRandomAge = (min: number, max: number): number => {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomName = () => {
  const names = [
    "Whiskers",
    "Luna",
    "Milo",
    "Oliver",
    "Cleo",
    "Simba",
    "Chloe",
    "Leo",
    "Zoe",
    "Nala",
    "Ginger",
    "Shadow",
  ];

  return names[Math.floor(Math.random() * (names.length - 1))];
};

const DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
