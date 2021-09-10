import { ImageService } from './../../../services/image.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.scss']
})
export class CategoriesCreateComponent implements OnInit {

  images: any

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getImages().subscribe(data => {
      console.log(data)
      this.images = data
      console.log(this.images)
    })
  }

}
