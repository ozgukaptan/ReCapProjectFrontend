import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {
  colors: Color[] = [];
  dataLoaded = false;

  colorAddForm: FormGroup;
  colorUpdateForm: FormGroup;
  colorDeleteForm: FormGroup;
  selectedColor: Color;

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getColors();
    this.addCreateForm();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = response.success;
    });
  }

  addCreateForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  setSelectedColorToUpdate(color: Color) {
    this.selectedColor = color;
    this.updateCreateForm();
  }

  updateCreateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      id: [this.selectedColor.id, Validators.required],
      name: ['', Validators.required],
    });
  }

  setSelectedColorToDelete(color: Color) {
    console.log(color)
    this.selectedColor = color;
    this.deleteCreateForm();
  }

  deleteCreateForm() {
    this.colorDeleteForm = this.formBuilder.group({
      id: [this.selectedColor.id, [Validators.required]],
      name: [this.selectedColor.name, [Validators.required]],
    });
  }

  addColor() {
    if (this.colorAddForm.valid) {
      let addColorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.addColor(addColorModel).subscribe(
        (response) => {
          this.getColors();
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.warning(
        'Renk ismi boş olamaz',
        'Ekleme Başarısız');
    }
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.updateColor(colorModel).subscribe(
        (response) => {
          this.getColors();
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          console.log(responseError)
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.warning(
        'Renk ismi boş olamaz',
        'Güncelleme Başarısız'
      );
    }
  }

  deleteColor() {
    if (this.colorDeleteForm.valid) {
      let colorModel = Object.assign({}, this.colorDeleteForm.value);
      this.colorService.deleteColor(colorModel).subscribe(
        (response) => {
          this.getColors();
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.warning(
        'Marka ismi boş olamaz',
        'Güncelleme Başarısız'
      );
    }
  }
}