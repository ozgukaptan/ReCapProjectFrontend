import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  

  apiUrl = "https://localhost:44352/api/"
  environment: any;
  constructor(private httpClient:HttpClient) { }

  getIsRentable(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl+"rentals/isrentable"
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
