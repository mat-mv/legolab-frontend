import { Image as Media } from "./image.interface";
import { Button as ButtonInterface } from "../../utils/interfaces/button.interface";
import { Category } from "../../utils/interfaces/category.interface";
import { Teammember } from "../../utils/interfaces/teammember.interface";

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
  bom: Media,
  generalBuildHint: string,
  buildInstructionDescription: string,
  ctaButtons: ButtonInterface[],
  teammitglieds: Teammember[];

}