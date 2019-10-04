import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './product.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-client';

  simpleReqProductsObs$: Observable<Product[]>;
  productsErrorHandling: Product[];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
  }

  getSimpleHttpRequest() {
    this.simpleReqProductsObs$ = this.productsService.getProdutos();
  }

  getProductsWithErrorHandling() {
    this.simpleReqProductsObs$ = this.productsService.getProdutosErr();
  }

  getProductsWithErrorHandlingOK(){

  }
}
