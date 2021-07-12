import { Amount } from "./Amount";
import { Plate } from "./Plate";

export interface Pedido {

  id?: number
  date: string
  total: number
  numTable: number
  email: string
  restaurantName: string
  amounts?: Amount[]
}
