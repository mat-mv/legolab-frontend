import { Image } from "./image.interface";

export interface Teammember {
  member: Teammember;
  id: number,
  image: Image,
  name: string,
  semester: string,
  bots: any,
  taetigkeit: any,
  fach: string,
}