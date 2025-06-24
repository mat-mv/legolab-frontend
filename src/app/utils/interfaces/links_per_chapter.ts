import { Link } from "./link.interface";

export interface LinksPerChapter {
  id: number,
  linkList: Link[],
  chapter: number,
  slug: string,
}