import { TestService } from './../../services/test.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private service: TestService) { }

  ngOnInit(): void {
    // this.service.test().subscribe(data => {
    //   console.log(data)
    // })

    this.service.categories().subscribe(data => {
      console.log(data)
    })
  }

}
