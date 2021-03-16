import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car, CarDetail } from 'src/app/models/car';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private carDetailService: CarDetailService,
    private router: Router, private toastr: ToastrService, private paymentService: PaymentService
  ) { }
  rental: Rental;
  carDetail: CarDetail;
  amountOfPayment: number = 0;
  payment: Payment = { amount: 0 };
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["rental"]) {
        this.rental = JSON.parse(params['rental']);
        this.getCar();
      }
    }, responseError => {
      console.log("message")
      this.toastr.error(responseError.error.message.toString(),"işlem başarısız");
    })

  }

  getCar() {
    this.carDetailService.getCar(this.rental.carId).subscribe(response => {
      this.carDetail = response.data;
      this.paymentCalculator();
    }, responseError => {
      console.log("message")
      this.toastr.error(responseError.error.message.toString(),"işlem başarısız");
    })
  }
  paymentCalculator() {

    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();


      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      console.log(numberOfDays * this.carDetail.dealyPrice)
      this.amountOfPayment = numberOfDays * this.carDetail.dealyPrice;
      this.payment.amount = this.amountOfPayment;
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['/cars']);
        this.toastr.error("Araç listesine yönlendiriliyorsunuz", "Hatalı işlem");
      }
    }
  }
  pay() {
    this.paymentService.pay(this.payment, this.rental).subscribe(response => {
      this.toastr.success(response.message.toString(), "İşlem Başarılı");
      this.router.navigate(['/cars']);
    }, responseError => {
      this.toastr.error(responseError.error.message.toString(),"işlem başarısız");
    })
  }

}
