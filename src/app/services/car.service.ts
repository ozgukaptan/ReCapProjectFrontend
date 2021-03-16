import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car, CarDetail } from '../models/car';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44352/api/"
  environment: any;
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl+"cars/getall"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  
  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl+"cars/getbybrand?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl+"cars/getbycolor?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrandAndColor(brandId:number,colorId:number){
    let newPath = this.apiUrl+"cars/getbybrandandcolor?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCar(id:number):Observable<ItemResponseModel<CarDetail>>{
    let newPath = this.apiUrl+"cars/getbyid?id="+id;
    return this.httpClient.get<ItemResponseModel<CarDetail>>(newPath);
  }

  addCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl+"cars/add";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  updateCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl+"cars/update";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  deleteCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl+"cars/delete";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

}
