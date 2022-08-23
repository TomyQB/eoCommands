export class PrinterPlugin {
  accion: string
  datos: string

  constructor(accion: string, datos: string) {
    this.accion = accion + "";
    this.datos = datos + "";
  }
}
