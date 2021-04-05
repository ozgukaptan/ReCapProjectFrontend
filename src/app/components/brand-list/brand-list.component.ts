import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands: Brand[];

  selectedBrand: Brand;
  dataLoaded = false;

  brandUpdateForm:FormGroup;
  brandAddForm:FormGroup;

  constructor(private toastrService: ToastrService, private brandService: BrandService,private formBuilderService: FormBuilder) { }

  ngOnInit(): void {
    this.getBrands();

  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      this.dataLoaded = response.success;
      console.log(this.brands);
    }, responseError => {
      this.toastrService.error(responseError.error.message.toString(), "işlem başarısız");
    })
  }

  addBrand() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.addBrand(brandModel).subscribe(response => {
        this.getBrands();
        this.toastrService.success(response.message)
        this.addCreateForm();
      }, responseError => {
        console.log(responseError)
        this.toastrService.error(responseError.error.message)
      })
    }
  }
  

  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.updateBrand(brandModel).subscribe(response => {
        this.getBrands();
        console.log(response);
        this.toastrService.success(response.message)
      }, responseError => {
        console.log(responseError)
        this.toastrService.error(responseError.error.message)
      })
    }
  }

  addCreateForm() {
    this.brandAddForm = this.formBuilderService.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  updateCreateForm() {
    this.brandUpdateForm = this.formBuilderService.group({
      id: [this.selectedBrand.id, [Validators.required]],
      name: [this.selectedBrand.name, [Validators.required]],
      description: [this.selectedBrand.description, [Validators.required]]
    })
  }

  setSelectedBrandToAdd(){
    this.addCreateForm()
  }

  setSelectedBrandToUpdate(brand: Brand) {
   
    this.selectedBrand = brand;
    this.updateCreateForm();
  }
}
