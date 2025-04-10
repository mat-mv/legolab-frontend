import { Image } from "./image.interface";

export interface TextBox {
    id: number,
    title: string,
    body: string,
    icon: Image,
    href: string,
}