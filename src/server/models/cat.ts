import { Breed } from "./breed";

export type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
  name: string;
  age: number;
  description: string;
};
