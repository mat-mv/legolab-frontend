export interface Category {
  id: number,
  name: string,
  parent: Category | null |undefined,
  subCategories: Category[] | null | undefined,
}