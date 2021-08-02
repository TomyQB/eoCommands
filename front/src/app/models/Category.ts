import { Plate } from "./Plate";

export interface Category {
  id: number
  image: string,
  name: string,
  plates: Plate[]
}
