import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LIST } from '../../../constants/restaurant-configuration';
import {
  PRINT_LIST,
  BARRA,
  COCINA,
  CUENTA,
} from '../../../constants/print-confirmation';
import { MatDialog } from '@angular/material/dialog';
import { PrinterDialogComponent } from './printer-dialog/printer-dialog.component';
import { Restaurant } from '../../../models/Restaurant';
import { RestaurantPrinterService } from '../../../services/restaurant-printer.service';
import { RestaurantConfigurationService } from '../../../services/restaurant-configuration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration-admin',
  templateUrl: './configuration-admin.component.html',
  styleUrls: ['./configuration-admin.component.scss'],
})
export class ConfigurationAdminComponent implements OnInit {
  emailConfirmationFormControl = new FormControl('', [Validators.required]);
  printConfirmationFormControl = new FormControl('', [Validators.required]);
  emailConfirmationList = LIST;
  confirmationList = PRINT_LIST;
  printerBarra = <any>[];
  printerCocina = <any>[];
  printerCuenta = <any>[];

  restaurant: Restaurant = JSON.parse(sessionStorage.getItem('restaurant')!);

  constructor(
    public dialog: MatDialog,
    public printerService: RestaurantPrinterService,
    public configurationService: RestaurantConfigurationService,
    private router: Router
  ) {
    this.configurationService
      .getConfiguration(this.restaurant.id)
      .subscribe((res) => {
        this.printConfirmationFormControl.setValue(res?.printConfirmation);
        this.emailConfirmationFormControl.setValue(res?.mailConfirmation);
      });
  }

  ngOnInit(): void {
    this.getPrinters();
  }

  getPrinters() {
    this.printerService.getPrinters(this.restaurant.id).subscribe((res) => {
      this.printerBarra = res.filter((printer: any) => printer.type === BARRA);
      this.printerCocina = res.filter(
        (printer: any) => printer.type === COCINA
      );
      this.printerCuenta = res.filter(
        (printer: any) => printer.type === CUENTA
      );
    });
  }

  sendConfiguration() {
    if (
      (this.emailConfirmationFormControl.value ||
        this.emailConfirmationFormControl.value === 0) &&
      (this.printConfirmationFormControl.value ||
        this.printConfirmationFormControl.value === 0)
    ) {
      const config = {
        restaurantId: this.restaurant.id,
        printConfirmation: this.printConfirmationFormControl.value,
        mailConfirmation: this.emailConfirmationFormControl.value,
      };
      this.configurationService.postConfiguration(config).subscribe(() => {});
      this.router.navigateByUrl('/restaurantPedidos');
    } else alert('Rellena todos los campos correctamente');
  }

  addPrinter(): void {
    const dialogRef = this.dialog.open(PrinterDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((print) => {
      this.printerService
        .postPrinters([print], this.restaurant.id)
        .subscribe(() => {
          switch (print?.type) {
            case BARRA:
              this.printerBarra.push(print);
              break;
            case COCINA:
              this.printerCocina.push(print);
              break;
            case CUENTA:
              this.printerCuenta.push(print);
              break;
            default:
          }
        });
    });
  }

  deletePrinter({ id }: any) {
    this.printerService.deletePrinter(id).subscribe(() => {
      this.getPrinters();
    });
  }
}
