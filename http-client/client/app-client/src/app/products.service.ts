import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.module';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly url: string = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  getProdutosErr(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/productserr`);
  }
}
