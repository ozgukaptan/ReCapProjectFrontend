import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car, CarDetail } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { ResponseModel } from 'src/app/models/responseModel';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  apiUrl: string = "https://localhost:44352";
  carDetail: CarDetail;
  rentDate: Date;
  returnDate: Date;
  dataLoaded: boolean = false;
  responseModel: ResponseModel;
  constructor(private cardetailService: CarDetailService, private router: Router, private activatedRoute: ActivatedRoute, private rentalService: RentalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"]) {
        this.getCar(params["id"])
      }
    })
  }


  getCar(id: number) {
    this.cardetailService.getCar(id).subscribe(Response => {
      this.carDetail = Response.data;
      this.dataLoaded = true;
    })

  }

  getIsRentable() {
    let myRental: Rental = {
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      carId: this.carDetail.id,
      customerId: 1
    }
    console.log(myRental)
    this.rentalService.getIsRentable(myRental).subscribe(Response => {
      this.responseModel = Response
      console.log("Ödeme sayfasına yönlendiriliyorsunuz...")
      this.toastr.info("Ödeme sayfasına yönlendiriliyorsunuz...", "Ödeme İşlemleri");
      this.router.navigate(['/payment/', JSON.stringify(myRental)]);
    }, responseError => {
      console.log(responseError);
      this.toastr.warning(responseError.error.message.toString(),"İşlem Başarısız.")
    })

    // this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
    //this.toastr.info("Ödeme sayfasına yönlendiriliyorsunuz...", "Ödeme İşlemleri");
    /*
    this.rentalService.rentalCar(MyRental).subscribe(response => {
      this.toastr.success(response.message.toString(), "Harika...");
    })
    */
  }

}
