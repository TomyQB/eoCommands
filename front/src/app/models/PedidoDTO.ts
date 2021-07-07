import { Plate } from "./Plate";

export interface PedidoDTO {
  numTable: number,
  email: string,
  restaurantId: number,
  plates: Plate[]
}
