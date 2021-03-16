import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})

export class BrandService {
  apiUrl = "https://localhost:44352/api/brands"
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"/getall");
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add",brand);
  }

  updateBrand(brand:Brand):Observable<ItemResponseModel<Brand>>{
    return this.httpClient.post<ItemResponseModel<Brand>>(this.apiUrl+"/update",brand);
  }


}
