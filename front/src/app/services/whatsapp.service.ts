import { WhatsAppDTO } from './../models/WhatsAppDTO';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  public message: string = ""

  constructor() { }

  singletonMessage(pendingOrders: any, total: number, whatsAppDTO: WhatsAppDTO) {
    if(this.message == "") this.createMessage(pendingOrders, total, whatsAppDTO)
  }

  private createMessage(pendingOrders: any, total: number, whatsAppDTO: WhatsAppDTO) {
    let message = "https://api.whatsapp.com/send?phone=" + whatsAppDTO.phone + "&text="
    message += "Esta es su cuenta en el restaurante *" + whatsAppDTO.restaurantName + "*%0AMesa " + whatsAppDTO.tableNum + "%0A%0A"

    for(let i = 0; i < pendingOrders.length; i++) {
      if(pendingOrders[i].plate)
        message += pendingOrders[i].amount + " " + pendingOrders[i].plate.name + " " + pendingOrders[i].plate.price + "€ = " + pendingOrders[i].plate.price * pendingOrders[i].amount + "€%0A"
      else
        message += pendingOrders[i].amount + " " + pendingOrders[i].additional.name + " " + pendingOrders[i].additional.price + "€ = " + pendingOrders[i].additional.price * pendingOrders[i].amount + "€%0A"
    }

    message += "%0A%0A" + "*TOTAL = " + total + "*"
    message += "%0A(IVA 10% = " + total * 0.1 + ")"

    this.message = message

    return message
  }
}
