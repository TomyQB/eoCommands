import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-phone',
  templateUrl: './modal-phone.component.html',
  styleUrls: ['./modal-phone.component.scss']
})
export class ModalPhoneComponent implements OnInit {

  @Input() code!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
