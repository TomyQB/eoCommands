import { Image } from './../../../models/image';
import { MenuServicesService } from './../../../services/menu-services.service';
import { ImageService } from './../../../services/image.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CategoryDTO } from 'src/app/models/CategoryDTO';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.scss']
})
export class CategoriesCreateComponent implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile!: ElementRef

  images: any
  imagen: File | undefined
  imagenMin: File | undefined

  category: CategoryDTO = {
    name: "",
    restaurant: parseInt(sessionStorage.getItem('userId')!),
    image: "",
    idImage: ""
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private imageService: ImageService, private menuService: MenuServicesService, private router: Router/*, private spinner: NgxSpinnerService*/) { }

  ngOnInit(): void {
    console.log(this.category.restaurant)
    if(JSON.parse(sessionStorage.getItem('editCategory')!)) {
      this.category.image = JSON.parse(sessionStorage.getItem('editCategory')!).image
      this.nameFormControl.setValue(JSON.parse(sessionStorage.getItem('editCategory')!).name)
      this.category.id = JSON.parse(sessionStorage.getItem('editCategory')!).id
    }

    this.imageService.getImages().subscribe(data => {
      this.images = data
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    sessionStorage.removeItem('editCategory')
  }

  chooseImage(image: string) {
    this.category.image = image
  }

  uploadPhoto() {
    if(this.imagen != undefined) {
      this.imageService.upload(this.imagen!).subscribe(data => {
        this.category.image = data.image
        this.category.idImage = data.idImage
        this.createCategory();
      })
    } else this.createCategory();

  }

  createCategory() {
    if((this.category.image != "" || this.imagen != undefined) && this.nameFormControl.value != "") {
      this.category.name = this.nameFormControl.value
      this.menuService.addCategory(this.category).subscribe(data => {
        this.router.navigateByUrl("/adminCategories");
      })
    } else alert("Nombre y foto obligatios")
  }

  onUpload() {

  }

  onFileChange(event: any) {
    console.log("estoy")
    this.imagen = event.target.files[0]
    console.log(this.imagen)
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result
    }
    fr.readAsDataURL(this.imagen!)
  }

  reset() {
    this.imagen = undefined
    this.imagenMin = undefined
    this.imagenFile.nativeElement.value = ""
  }

}
