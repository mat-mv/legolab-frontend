import { Image as ImageType } from "../utils/interfaces/image.interface";
import { PlatzhalterMedia } from "../utils/interfaces/platzhalter_media.interface";

/**
 * Gibt eine Bild-URL zurück, entweder das Bild oder den Platzhalter.
 * @param imageObj Das Bildobjekt (z.B. member.image)
 * @param platzhalter Das PlatzhalterMedia-Objekt (z.B. platzhalterAvatar)
 * @returns Die vollständige Bild-URL als String
 */



export function getImageUrl(
  imageObj: ImageType | undefined,
  platzhalter?: PlatzhalterMedia
): string {
  if (imageObj?.url && imageObj.url.trim() !== "") {
    return `https://www.legolab-karlsruhe.de${imageObj.url}`;
  }
  if (platzhalter?.bild?.url && platzhalter.bild.url.trim() !== "") {
    return `https://www.legolab-karlsruhe.de${platzhalter.bild.url}`;
  }
  return "/fallback.png"; // Optional: lokales Fallback
}