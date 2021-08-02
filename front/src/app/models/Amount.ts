import { Pedido } from "./Pedido"
import { Plate } from "./Plate"

export class Amount {
  id?: number
  amount!: number
  description!: string
  subTotal!: number
  plate!: Plate
  pedido?: Pedido
}
