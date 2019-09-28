import { DepartmentService } from './department.service';
import { Product } from './models/product.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dataFromServer: any[] = [
    {id: 1, name: 'Laptop', department_id: 4, price: 40, description: 'Laptop description'},
    {id: 2, name: 'Shirt', department_id: 1, price:10, description: 'Shirt description'},
    {id: 3, name: 'Polo', department_id: 1, price: 50, description: 'Polo description'},
    {id: 4, name: 'Mouse', department_id: 3, price: 40, description: 'Mouse description'}
  ] 

  private products: Product[] = [];
  private nextId: number;

  // importar de @angular/core
  // esse evento será emitido toda vez que um produto for incluido
  onNewProduct: EventEmitter<Product> = new EventEmitter()

  constructor(
    private departmentService: DepartmentService
  ) {
    for(let p of this.dataFromServer) {
      this.products.push({
        id: p.id,
        name: p.name,
        price: p.price,
        description: p.description,
        department: this.departmentService.getDepartmentById(p.department_id)
      })
      this.nextId = p.id+1;
    }
  }

  getProducts() : Product[] {
    return this.products;
  }


  addProduct(p: Product) {
    let prod: Product = {id: this.nextId++, ...p}
    this.products.push(prod)
    console.log(this.products);
    this.onNewProduct.emit(prod);
  }
}
