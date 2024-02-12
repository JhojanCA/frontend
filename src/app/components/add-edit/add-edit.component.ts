import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar '; 

  constructor(private fb: FormBuilder, 
              private _productService: ProductService,
              private router: Router,
              private aRoute: ActivatedRoute) { 

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
    });

    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }

  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,
    } 

    this.loading = true;

    if (this.id !== 0) {
      // Es editar
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        Swal.fire({
          title: "ACTUALIZADO CON ÉXITO!",
          icon: "success"
        }); 
        this.loading = false;
        this.router.navigate(['/']);
      })
    } else {
      // Es agregar      
      this._productService.saveProduct(product).subscribe(() => {        
        Swal.fire({
          title: "¡GUARDADO CON ÉXITO!",
          icon: "success"
        });     
        this.loading = false;
        this.router.navigate(['/']);   
      });
    }       
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) => {
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      });
    });
  }
}
