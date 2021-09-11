import { Additional } from "./Additional";
import { Amount } from "./Amount";

export interface Plate {
  id: number,
  name: string,
  price: number,
  description: string,
  additionals: Additional[],
  amount: Amount,
  drink: boolean,
  category?: number
  available?: boolean
}
