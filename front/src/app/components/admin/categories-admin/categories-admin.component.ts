import { RestaurantService } from 'src/app/services/restaurant.service';
import { ModalDeleteComponent } from './../../modal-delete/modal-delete.component';
import { MenuServicesService } from './../../../services/menu-services.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { Plate } from 'src/app/models/Plate';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImageService } from 'src/app/services/image.service';
import { RestaurantDTO } from 'src/app/models/RestaurantDTO';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.scss']
})
export class CategoriesAdminComponent implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile!: ElementRef

  categories!: Category[]
  // image: string = sessionStorage .getItem("image")!
  // idImage: string = sessionStorage .getItem("idImage")!

  restaurant: RestaurantDTO = {
    id: parseInt(sessionStorage .getItem('userId')!),
    name: "",
    ordersAmount: 0,
    image: sessionStorage .getItem("image")!,
    idImage: sessionStorage .getItem("idImage")!
  }

  imagen: File | undefined
  imagenMin: File | undefined

  restaurantName: string = sessionStorage .getItem("rname")!

  dialogConfig: MatDialogConfig = {
    width: '90%',
  }

  constructor(private imageService: ImageService, public dialog: MatDialog, private menuService: MenuServicesService, private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.setUrlName();

    this.menuService.getMenu(this.restaurantName).subscribe(data => {
      this.categories = data
      sessionStorage .setItem('idRestaurant', data[0].restaurant.id);
    })
  }

  ngOnDestroy(): void {
    window.location.reload()
  }

  private setUrlName() {
    if(this.restaurantName != null) {
      sessionStorage .setItem('name', this.restaurantName);
    }
  }

  plateView(i: number, category: Category) {

    this.categories[i].plates = this.duplicateFilter(this.categories[i].plates)
    sessionStorage .setItem('plates', JSON.stringify(this.categories[i].plates))
    sessionStorage .setItem('category', JSON.stringify(category))
    this.router.navigateByUrl("/adminPlates"/*, {state: {plates: this.categories[i].plates, category: category}}*/);
  }

  duplicateFilter(plates: Plate[]): Plate[] {
    let hash: {[key: string]: boolean} = {}
    plates = plates.filter(o => hash[o.name] ? false : hash[o.name] = true);

    return plates
  }

  createCategory() {
    console.log("new")
    this.router.navigateByUrl("/adminCategoriesCreate");
  }

  deleteCategory(category: Category) {
    console.log(category)
    const dialogRef = this.dialog.open(ModalDeleteComponent, this.dialogConfig)
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.menuService.deleteCategory(category.id, category.idImage!).subscribe(data => {
          window.location.reload();
        })
      }
    })
  }

  editCategory(category: Category) {
    sessionStorage .setItem('editCategory', JSON.stringify(category))
    this.router.navigateByUrl("/adminCategoriesCreate", {state: {category: category}});
  }

  goPedidos() {
    this.router.navigateByUrl("/restaurantPedidos");
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

  uploadPhoto() {
      this.imageService.upload(this.imagen!).subscribe(data => {
        console.log(data)
        this.restaurant.image = data.image
        this.restaurant.idImage = data.idImage
        this.updateRestaurant();
      })
  }

  updateRestaurant() {
      this.restaurantService.updateRestaurantPhoto(this.restaurant).subscribe(data => {
        sessionStorage .setItem("image", this.restaurant.image)
        sessionStorage .setItem("idImage", this.restaurant.idImage)
        this.reset()
      })
  }

  reset() {
    this.imagen = undefined
    this.imagenMin = undefined
    this.imagenFile.nativeElement.value = ""
  }

}
