import { Plate } from "./Plate";

export interface Category {
  id: number
  image: string,
  idImage?: string,
  name: string,
  plates: Plate[]
}
