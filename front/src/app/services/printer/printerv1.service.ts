import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

    constructor(private http: HttpClient) { }

    printers: any;
    Url = environment.Url

    static URL_PLUGIN = "https://localhost:8000";

    getPrinters() {
        return this.http.get<any>(PrinterService.URL_PLUGIN + "/getPrinters")
    }
    
    generateBodyCuenta(pendingOrders: any) {
        return this.http.post<any>(this.Url + "generateTicketCuenta", pendingOrders)
    }
    
    generateBodyFood(order: any) {
        return this.http.post<any>(this.Url + "generateTicketFood", order)
    }
    
    generateBodyDrink(order: any) {
        return this.http.post<any>(this.Url + "generateTicketDrink", order)
    }
      
    generateBodyCancelFood(order: any) {
        return this.http.post<any>(this.Url + "generateTicketCancelFood", order)
    }
    
    generateBodyCancelDrink(order: any) {
        return this.http.post<any>(this.Url + "generateTicketCancelDrink", order)
    }

    print(printName: string, text: string) {
        return this.http.post<any>(PrinterService.URL_PLUGIN + "/print/" + printName, text)
    }

}
