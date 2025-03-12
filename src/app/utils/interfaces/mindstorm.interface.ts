import { Bot } from "./bot.interface";
import { Image } from "./image.interface";

export interface Mindstorm {
  id: number,
  name: string,
  difficulty: number,
  description: string,
  image: Image,
  date: string,
  bots: Bot[],
  slug: string,
}