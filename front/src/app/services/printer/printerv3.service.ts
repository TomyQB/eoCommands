import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PrinterPlugin } from "./PrinterPlugin";
@Injectable({
    providedIn: 'root'
  })
    export class ConectorPlugin {

        constructor(private http: HttpClient) { }
        
    printers: any;

        static URL_PLUGIN_POR_DEFECTO = "http://localhost:8000";
        static Operacion = PrinterPlugin;
        static TAMAÑO_IMAGEN_NORMAL = 0;
        static TAMAÑO_IMAGEN_DOBLE_ANCHO = 1;
        static TAMAÑO_IMAGEN_DOBLE_ALTO = 2;
        static TAMAÑO_IMAGEN_DOBLE_ANCHO_Y_ALTO = 3;
        static ALINEACION_IZQUIERDA = 0;
        static ALINEACION_CENTRO = 1;
        static ALINEACION_DERECHA = 2;
        static RECUPERACION_QR_BAJA = 0;
        static RECUPERACION_QR_MEDIA = 1;
        static RECUPERACION_QR_ALTA = 2;
        static RECUPERACION_QR_MEJOR = 3;
        
        operaciones: any = []


        partialCut() {
            this.operaciones.push(new ConectorPlugin.Operacion("CorteParcial", ""));
            return this;
        }

        write(texto: any) {
            this.operaciones.push(new ConectorPlugin.Operacion("EscribirTexto", texto));
            return this;
        }

        establecerJustificacion(alineacion: any) {
            this.operaciones.push(new ConectorPlugin.Operacion("EstablecerAlineacion", alineacion));
            return this;
        }

        establecerEnfatizado(enfatizado: any) {
            this.operaciones.push(new ConectorPlugin.Operacion("EstablecerEnfatizado", enfatizado));
            return this;
        }

        EstablecerFuente(fuente: any) {
            this.operaciones.push(new ConectorPlugin.Operacion("EstablecerFuente", fuente));
            return this;
        }

        EstablecerTamañoFuente(multiplicadorAncho: any, multiplicadorAlto: any) {
            this.operaciones.push(new ConectorPlugin.Operacion("EstablecerTamañoFuente", multiplicadorAlto));
            return this;
        }

        HabilitarCaracteresPersonalizados() {
            this.operaciones.push(new ConectorPlugin.Operacion("HabilitarCaracteresPersonalizados",""));
            return this;
        }
        
        initPrint() {
            this.operaciones.push(new ConectorPlugin.Operacion("Iniciar", ""));
            return this;
        }

        async obtenerImpresoras() {
            const response = await fetch(ConectorPlugin.URL_PLUGIN_POR_DEFECTO + "/impresoras");
            return await response.json();
        }

        async imprimirEn(nombreImpresora: any) {
            const payload = {
                operaciones: this.operaciones,
                impresora: nombreImpresora,
            };
            //return this.http.post<any>(ConectorPlugin.URL_PLUGIN_POR_DEFECTO + "/imprimir", payload).subscribe(() => {console.log("printed")})
            const response = await fetch(ConectorPlugin.URL_PLUGIN_POR_DEFECTO + "/imprimir", {
                method: "POST",
                body: JSON.stringify(payload),
            });
            return await response.json();
        }
        
    limpiarImpresora() {
        this.operaciones = [];
    }

    }