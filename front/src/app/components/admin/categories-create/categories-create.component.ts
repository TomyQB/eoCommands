import { MenuServicesService } from './../../../services/menu-services.service';
import { ImageService } from './../../../services/image.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CategoryDTO } from 'src/app/models/CategoryDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.scss']
})
export class CategoriesCreateComponent implements OnInit {

  images: any

  category: CategoryDTO = {
    name: "",
    restaurant: parseInt(localStorage.getItem('userId')!),
    image: ""
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private imageService: ImageService, private menuService: MenuServicesService, private router: Router) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('editCategory')!)) {
      this.category.image = JSON.parse(localStorage.getItem('editCategory')!).image
      this.nameFormControl.setValue(JSON.parse(localStorage.getItem('editCategory')!).name)
      this.category.id = JSON.parse(localStorage.getItem('editCategory')!).id
      console.log(this.category)
    }
      // this.category.image = history.state.category.image
      // this.category.id = history.state.category.id

    this.imageService.getImages().subscribe(data => {
      this.images = data
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    localStorage.removeItem('editCategory')
  }

  chooseImage(image: string) {
    this.category.image = image
  }

  createCategory() {
    if(this.category.image != "" && this.nameFormControl.value != "") {
      this.category.name = this.nameFormControl.value
      this.menuService.addCategory(this.category).subscribe(data => {
        this.router.navigateByUrl("/adminCategories");
      })
    }
  }

}
