import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Amount } from '../models/Amount';
import { PRINCIPAL, ENTRANTE, BEBIDA } from '../constants/plate-type';

@Injectable({
  providedIn: 'root',
})
export class AmountServicesService {
  public amounts: any[] = [];

  public entrante: any[] = [];
  public principal: any[] = [];
  public bebida: any[] = [];

  Url = environment.Url;

  constructor(private http: HttpClient) {}

  changeEstadoAmount(amount: Amount) {
    return this.http.post<any>(this.Url + 'changeEstadoAmount', amount);
  }

  public addAmountToList(amount: Amount) {
    if (amount.plate!.type === ENTRANTE) {
      if (this.comprobatePrincipalExist(amount)) {
        this.principal.push(amount);
      } else {
        this.comprobateEntranteExist(amount);
        this.entrante.push(amount);
      }
    } else if (amount.plate!.type === PRINCIPAL) {
      if (this.comprobateEntranteExist(amount)) {
        this.entrante.push(amount);
      } else {
        this.comprobatePrincipalExist(amount);
        this.principal.push(amount);
      }
    } else if (amount.plate!.type === BEBIDA) {
      this.comprobateBebidaExist(amount);
      this.bebida.push(amount);
    }

    return this.calculateTotal();
  }

  private comprobateEntranteExist(amount: Amount) {
    let repeAmount: Amount;
    let exist: boolean = false;

    for (let i = 0; i < this.entrante.length; i++) {
      if (this.entrante[i].plate!.name == amount.plate!.name) {
        repeAmount = this.amounts[i];
        exist = true;

        if (amount.amount > 0) {
          this.updateEntrante(amount, i);
        } else if (amount.amount == 0) {
          this.deleteEntrante(i);
        }
      }
    }

    return exist;
  }

  private comprobatePrincipalExist(amount: Amount) {
    let repeAmount: Amount;
    let exist: boolean = false;

    for (let i = 0; i < this.principal.length; i++) {
      if (this.principal[i].plate!.name == amount.plate!.name) {
        repeAmount = this.amounts[i];
        exist = true;

        if (amount.amount > 0) {
          this.updatePrincipal(amount, i);
        } else if (amount.amount == 0) {
          this.deletePrincipal(i);
        }
      }
    }

    return exist;
  }

  private comprobateBebidaExist(amount: Amount) {
    let repeAmount: Amount;
    let exist: boolean = false;

    for (let i = 0; i < this.bebida.length; i++) {
      if (this.bebida[i].plate!.name == amount.plate!.name) {
        repeAmount = this.amounts[i];
        exist = true;

        if (amount.amount > 0) {
          this.updateBebida(amount, i);
        } else if (amount.amount == 0) {
          this.deleteBebida(i);
        }
      }
    }

    return exist;
  }

  private deleteAmount(index: number) {
    this.amounts.splice(index, 1);
  }

  private deleteEntrante(index: number) {
    this.entrante.splice(index, 1);
  }

  private deletePrincipal(index: number) {
    this.principal.splice(index, 1);
  }

  private deleteBebida(index: number) {
    this.bebida.splice(index, 1);
  }

  private updateAmount(amount: Amount, index: number) {
    this.deleteAmount(index);
    this.amounts.push(amount);
  }

  private updateEntrante(amount: Amount, index: number) {
    this.deleteEntrante(index);
  }

  private updatePrincipal(amount: Amount, index: number) {
    this.deletePrincipal(index);
  }

  private updateBebida(amount: Amount, index: number) {
    this.deleteBebida(index);
  }

  private calculateTotal() {
    let total: number = 0;

    this.entrante.forEach((element) => {
      total += element.subTotal;
    });

    this.principal.forEach((element) => {
      total += element.subTotal;
    });

    this.bebida.forEach((element) => {
      total += element.subTotal;
    });
    return total;
  }
}
