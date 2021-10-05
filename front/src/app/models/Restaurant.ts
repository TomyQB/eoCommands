import { Category } from "./Category";
import { Pedido } from "./Pedido";

export interface Restaurant {
  id: number,
  name: string,
  image: string,
  idImage: string,
  userName: string,
  email: string,
  phone: string,
  password: string,
  iban: string
  categories: Category[],
  orders: Pedido[]
}
