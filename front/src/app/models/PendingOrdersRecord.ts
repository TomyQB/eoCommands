import { Additional } from './Additional';
import { Plate } from 'src/app/models/Plate';

export interface PendingOrdersRecord {

  restaurantId: number,
  tableNum: number,
  plateAdditionalId: number
  subTotal: number,
  amount: number,
  date: string,
  plate: Plate,
  additional: Additional
}
