import { ConectorPlugin } from 'src/app/services/printer/printerv3.service';
import { PrinterPlugin } from './PrinterPlugin';
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

    static URL_PLUGIN = "http://localhost:8000";
    static OperacionTicket = PrinterPlugin;
    static Constantes = {
        AccionWrite: "write",
        AccionCut: "cut",
        AccionCash: "cash",
        AccionCutPartial: "cutpartial",
        AccionAlign: "align",
        AccionFontSize: "fontsize",
        AccionFont: "font",
        AccionEmphasize: "emphasize",
        AccionFeed: "feed",
        AccionQr: "qr",
        AlineacionCentro: "center",
        AlineacionDerecha: "right",
        AlineacionIzquierda: "left",
        FuenteA: "A",
        FuenteB: "B",
        AccionBarcode128: "barcode128",
        AccionBarcode39: "barcode39",
        AccionBarcode93: "barcode93",
        AccionBarcodeEAN: "barcodeEAN",
        AccionBarcodeTwoOfFiveSinInterleaved: "barcodeTwoOfFive",
        AccionBarcodeTwoOfFiveInterleaved: "barcodeTwoOfFiveInterleaved",
        AccionBarcodeCodabar: "barcodeCodabar",
        AccionBarcodeUPCA: "barcodeUPCA",
        AccionBarcodeUPCE: "barcodeUPCE",
        Medida80: 80,
        Medida100: 100,
        Medida156: 156,
        Medida200: 200,
        Medida300: 300,
        Medida350: 350,
    };

    operaciones: any = [];

        static getImpresoras() {
            return fetch(this.URL_PLUGIN + "/impresoras")
                .then(r => r.json());
        }
    
        static getImpresorasRemotas(ip: string) {
            return fetch(this.URL_PLUGIN + "/impresoras_remotas?ip=" + ip)
                .then(r => r.json());
        }
    
        cut() {
            this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionCut, ""));
        }
    
        partialCut() {
            this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionCutPartial, ""));
        }
    
        setFontSize(a: any, b: any) {
            this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionFontSize, `${a},${b}`));
        }
    
        setFont(font: any) {
            if (font !== PrinterService.Constantes.FuenteA && font !== PrinterService.Constantes.FuenteB) throw Error("Fuente inválida");
            this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionFont, font));
        }

        establecerEnfatizado(val: any) {
            if (isNaN(parseInt(val)) || parseInt(val) < 0) throw Error("Valor inválido");
            this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionEmphasize, val));
        }

        establecerJustificacion(align: any) {
            if (align !== PrinterService.Constantes.AlineacionCentro
                && align !== PrinterService.Constantes.AlineacionDerecha 
                && align !== PrinterService.Constantes.AlineacionIzquierda) {
                throw Error(`Alineación ${align} inválida`);
            }
            this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionAlign, align));
        }
    
        write(text: any) {
            this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionWrite, text));
        }

    
        imprimirEn(nombreImpresora: any) {
            const payload = {
                operaciones: this.operaciones,
                impresora: nombreImpresora,
            };
            return fetch(ConectorPlugin.URL_PLUGIN_POR_DEFECTO + "/imprimir_en", {
                    method: "POST",
                    body: JSON.stringify(payload),
                })
                .then(r => r.json());
        }    

    limpiarImpresora() {
        this.operaciones = [];
    }

    quitarAcentos(text: string) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    generateTicket(pendingOrders: any) {
        return this.http.post<any>(this.Url + "generateTicket", pendingOrders)

    }

}
