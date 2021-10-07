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
  estadoFood?: string
  estadoDrink?: string
  hechosFood?: number
  hechosDrink?: number
  ordersAmount?: number
  drinkCount?: number
  foodCount?: number
}
