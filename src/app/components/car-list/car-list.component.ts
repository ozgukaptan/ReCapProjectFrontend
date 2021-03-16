import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car, CarDetail } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  brands: Brand[] = [];
  colors: Color[] = [];
  carDetails: CarDetail[];
  selectedcar: CarDetail;
  dataLoaded = false;

  carAddForm: FormGroup;
  carUpdateForm :FormGroup;

  constructor(private carService: CarService,
    private toastrService: ToastrService, private brandService: BrandService, private colorService: ColorService, private formBuilderService: FormBuilder) { }

  ngOnInit(): void {
    
    this.addCreateForm();
    this.getCars();
    console.log(this.getCars());
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.carDetails = response.data;
      this.dataLoaded = response.success;
      console.log(this.carDetails);
    }, responseError => {
      this.toastrService.error(responseError.error.message.toString(), "işlem başarısız");
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
      this.dataLoaded = response.success;
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      this.dataLoaded = response.success;
    })
  }

  setSelectedCarToAdd() {
    this.getColors();
    this.getBrands();
  }

  addCreateForm() {
    this.carAddForm = this.formBuilderService.group({
      brandId: ['', [Validators.required]],
      colorId: ['', [Validators.required]],
      modelYear: ['', [Validators.required]],
      dealyPrice: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  updateCreateForm() {
    this.carUpdateForm = this.formBuilderService.group({
      id: [this.selectedcar.id, [Validators.required]],
      brandId: [this.selectedcar.brandId, [Validators.required]],
      colorId: [this.selectedcar.colorId, [Validators.required]],
      modelYear: [this.selectedcar.modelYear, [Validators.required]],
      dealyPrice: [this.selectedcar.dealyPrice, [Validators.required]],
      description: [this.selectedcar.description, [Validators.required]]
    })
  }

  addCar() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.addCar(carModel).subscribe(response => {
        this.getCars();
        this.toastrService.success(response.message)
        this.addCreateForm();
      }, responseError => {
        console.log(responseError)
        this.toastrService.error(responseError.error.message)
      })
    }
  }

  updateCar() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.updateCar(carModel).subscribe(response => {
        this.getCars();
        console.log(response);
        this.toastrService.success(response.message)
      }, responseError => {
        console.log(responseError)
        this.toastrService.error(responseError.error.message)
      })
    }
  }

  deleteCar() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.addCar(carModel).subscribe(response => {
        this.getCars();
        this.toastrService.success(response.message)
        this.addCreateForm();
      }, responseError => {
        console.log(responseError)
        this.toastrService.error(responseError.error.message)
      })
    }
  }

  setSelectedCarToUpdate(carDetail: CarDetail) {
    this.getColors();
    this.getBrands();
    this.selectedcar = carDetail;
    this.updateCreateForm();
  }


}
