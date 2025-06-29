import { Bot } from "./bot.interface";
import { Image } from "./image.interface";

export interface Mindstorm {
  id: number,
  image: Image,
  name: string,
  slug: string,
  interfaces: number,
  shotDescRTMD: string,
  longDescRTMD: string,
  date: string,
  bots: Bot[],
  developerboard: String,
  legoSetNumber: number,
  infrared: boolean,
  bluetooth: boolean,
  codingTypes: string
}