import { Image as Media } from "./image.interface";
import { Button as ButtonInterface } from "../../utils/interfaces/button.interface";
import { Category } from "../../utils/interfaces/category.interface";

export interface Bot {
  id: number,
  name: string,
  buildDif: number,
  codeDif: number,
  shortDescription: string,
  description: string,
  image: Media,
  category: Category,
  slug: string,
  buildBOM: Media,
  buildBOMDownload: Media,
  buildHintText: string,
  buildInstructionHeader: string,
  buildInstructionDescription: string,
  ctaButtons: ButtonInterface[];
}