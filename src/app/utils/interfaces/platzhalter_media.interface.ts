import { Image as Media } from "./image.interface";

export interface PlatzhalterMedia {
  id: number,
  name: string,
  bild: Media,
  textcontent: string,
}