import { Pipe, PipeTransform } from '@angular/core';
import { Car, CarDetail } from '../models/car';

@Pipe({
  name: 'filterCar'
})
export class FilterCarPipe implements PipeTransform {

  transform(carDetails: CarDetail[], filtertext : string): CarDetail[] {
   return carDetails || filtertext ? carDetails.filter(carDetail=>
    carDetail.brand.toLocaleLowerCase().includes(filtertext.toLocaleLowerCase()) ||
    carDetail.color.toLocaleLowerCase().includes(filtertext.toLocaleLowerCase()) ||
    carDetail.description.toLocaleLowerCase().includes(filtertext.toLocaleLowerCase()) ||
    carDetail.modelYear.toString().toLocaleLowerCase().includes(filtertext.toLocaleLowerCase()) ||
    carDetail.dealyPrice.toString().toLocaleLowerCase().includes(filtertext.toLocaleLowerCase())
   ):carDetails;
  }

}
