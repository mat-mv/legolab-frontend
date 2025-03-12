import { Category } from "./category.interface";
import { Image } from "./image.interface";

export interface Bot {
  id: number,
  name: string,
  buildDif: number,
  codeDif: number,
  shortDescription: string,
  description: string,
  image: Image,
  slug: string,
  category: Category,
}