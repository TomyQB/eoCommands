import { Amount } from "./Amount";

export interface Pedido {

  id?: number
  date: string
  total: number
  numTable: number
  email: string
  phoneNumber: string
  restaurantId: number
  amounts?: Amount[]
  estado?: string
  hechos?: number
  ordersAmount?: number
  drinkCount?: number
  foodCount?: number
}
