import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car, CarDetail } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  car: CarDetail;
  cars: CarDetail[] = [];
  currentCar: Car;
  dataLoaded: boolean = false;
  filterText = "";

  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"] && params["colorId"]){
        this.getCarsByBrandAndColor(params["brandId"],params["colorId"])
      }
      else if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      } else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      }
      else {
        this.getCars();
      }
    })
  }

  getCars() {
    this.carService.getCars()
      .subscribe(Response => {
        this.cars = Response.data, this.dataLoaded = true
      });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId)
      .subscribe(response => {
        this.cars = response.data
        this.dataLoaded = true;
      })
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId)
      .subscribe(response => {
        this.cars = response.data
        this.dataLoaded = true
      })
  }

  getCarsByBrandAndColor(brandId:number, colorId:number){
    this.carService.getCarsByBrandAndColor(brandId,colorId)
    .subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true
    })
  }

  setCurrentCar(car: Car) {
    this.currentCar = car
  }

  getCurrentCarClass(car: Car) {
    if (car == this.currentCar) {
      return "table-active"
    } else {
      return "table"
    }
  }


}
