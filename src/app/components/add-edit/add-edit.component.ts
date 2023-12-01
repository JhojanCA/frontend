import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, Validators.required],
      stock: [null, Validators.required],
    });
  }

  addProduct() {
    const product: Product = {
      name: this.form.value.nombre,
      description: this.form.value.descripcion,
      price: this.form.value.precio,
      stock: this.form.value.stock,
    }    
    console.log(product);
    
  }
}
