import { Component } from '@angular/core';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  listProducts: { id: number; nombre: string; descripcion: string; precio: number; stock: number; }[];

  constructor() {
    this.listProducts = [
      { id: 1, nombre: 'Coca Cola', descripcion: 'Bebida con azucar', precio: 4, stock: 200 },
      { id: 2, nombre: 'Corona', descripcion: 'Bebida de alcohol', precio: 5 , stock: 300 }
    ];
  }
}
