import { ProductService } from './../product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product.model';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  // faz um binding com a tela
  @ViewChild(MatTable, {static: false}) dataTable: MatTable<any>;
  products: Product[];
  prodColumns: string[] = ['id', 'name', 'price', 'description', 'department']

  constructor(
    private productService: ProductService
  ) { }
  
  ngOnInit() {
    this.products = this.productService.getProducts();
    // me inscrevo no emiter
    this.productService.onNewProduct.subscribe((p) => {
      // forca o datatable a renderizar para carregar novos intens
      this.dataTable.renderRows();
    })
  }

}
