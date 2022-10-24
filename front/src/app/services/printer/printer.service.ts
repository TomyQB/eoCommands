import { PrinterPlugin } from './PrinterPlugin';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

    constructor(private http: HttpClient) { }

    printers: any;

    static URL_PLUGIN_POR_DEFECTO = "http://localhost:8000";
    static OperacionTicket = PrinterPlugin;
    static Constantes = {
            Iniciar: "Iniciar",
            AccionTextoConAcentos: "textoacentos",
            AccionQrComoImagen: "qrimagen",
            AccionImagen: "imagen",
            AccionText: "EscribirTexto",
            AccionCut: "Corte",
            AccionPulse: "Pulso",
            AccionCutPartial: "CorteParcial",
            AccionJustification: "setJustification",
            AccionTextSize: "EstablecerTamañoFuente",
            AccionFont: "EstablecerFuente",
            AccionEmphasize: "EstablecerEnfatizado",
            AccionFeed: "Feed",
            AccionQr: "qrCode",
            AlineacionCentro: "center",
            AlineacionDerecha: "right",
            AlineacionIzquierda: "left",
            FuenteA: "A",
            FuenteB: "B",
            FuenteC: "C",
            AccionBarcode128: "barcode128",
            AccionBarcode39: "barcode39",
            AccionBarcode93: "barcode93",
            AccionBarcodeItf: "barcodeitf",
            AccionBarcodeJan13: "barcodejan13",
            AccionBarcodeJan8: "barcodejan8",
            AccionBarcodeTextAbove: "barcodetextabove",
            AccionBarcodeTextBelow: "barcodetextbelow",
            AccionBarcodeTextNone: "barcodetextnone",
            AccionBarcodeUPCA: "barcodeUPCA",
            AccionBarcodeUPCE: "barcodeUPCE",
            AccionImagenLocal: "imagenlocal",
        };

    operaciones: any = [];

    getPrinters() {
        return fetch(PrinterService.URL_PLUGIN_POR_DEFECTO + "/impresoras")
            .then(r => r.json());
    }
    
    initPrint() {
        this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.Iniciar, ""));
        return this;
    }

    textoConAcentos(texto: string) {
        this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionTextoConAcentos, texto));
        return this;
    }

    cut() {
        this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionCut, ""));
        return this;
    }

    partialCut() {
        this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionCutPartial, ""));
        return this;
    }

    openDrawer() {
        this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionPulse, ""));
        return this;
    }

    establecerTamanioFuente(a: string, b: string) {
        this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionTextSize, `${a},${b}`));
        return this;
    }

    establecerFuente(font: string) {
        if (font !== PrinterService.Constantes.FuenteA && font !== PrinterService.Constantes.FuenteB && font !== PrinterService.Constantes.FuenteC) throw Error("Fuente inválida");
        this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionFont, font));
        return this;
    }

    establecerEnfatizado(val: number) {
        if (val !== 0 && val !== 1) {
            throw Error("El valor debe ser 1 para true, 0 para false");
        }
        this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionEmphasize, val.toString()));
        return this;
    }

    establecerJustificacion(justification: string) {
        if (justification !== PrinterService.Constantes.AlineacionCentro && justification !== PrinterService.Constantes.AlineacionDerecha && justification !== PrinterService.Constantes.AlineacionIzquierda) {
            throw Error(`Alineación ${justification} inválida`);
        }
        this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionJustification, justification));
        return this;
    }

    write(text: string) {
        // console.log(text)
        this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionText, text));
        return this;
    }

    feed(n: string) {
        if (!parseInt(n) || parseInt(n) < 0) {
            throw Error("Valor para feed inválido");
        }
        this.operaciones.push(new PrinterService.OperacionTicket(PrinterService.Constantes.AccionFeed, n));
        return this;
    }
    
    async imprimirEn(nombreImpresora: string | undefined) {
        const payload = {
            operaciones: this.operaciones,
            impresora: nombreImpresora,
        };
        console.log(payload)
        const respuestaRaw = await fetch(PrinterService.URL_PLUGIN_POR_DEFECTO + "/imprimir",
        {
            method: "POST",
            body: JSON.stringify(payload),
        });
        return respuestaRaw.json();
    }

    limpiarImpresora() {
        this.operaciones = [];
    }

}
