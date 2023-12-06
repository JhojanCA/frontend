import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  listProducts: Product[] = [];
  loading: boolean = false;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this.loading = true;
    this._productService.getListProducts().subscribe((data: Product[]) => {
      this.listProducts = data;
      this.loading = false;
    })
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El registro será eliminado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e83283",
      cancelButtonColor: "#39cbfb",
      confirmButtonText: "SI, ESTOY SEGURO",
      cancelButtonText: "NO"
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this._productService.deleteProduct(id).subscribe(() => {
          this.getListProducts();      
        });

        Swal.fire({
          title: "Eliminado",
          text: "El registro fue eliminado con éxito",
          icon: "success"
        });
      } else {
        this.getListProducts(); 
      }
    });    
  }
}
