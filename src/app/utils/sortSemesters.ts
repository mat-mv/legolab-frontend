import { Category } from "./interfaces/category.interface"

function semesterKey(name: string): number {
  const wise = name.match(/^WiSe (\d{4})\/\d{2}$/)
  if (wise) {
    return parseInt(wise[1], 10) * 2 + 1
  }

  const sose = name.match(/^SoSe (\d{4})$/)
  if (sose) {
    return parseInt(sose[1], 10) * 2
  }

  return -1
}

export function sortCategoriesBySemesterDesc(categories: Category[]): Category[] {
  return [...categories].sort((a, b) => semesterKey(b.name) - semesterKey(a.name))
}
