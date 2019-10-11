import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { Department } from './department';
import { Product } from './product';
import { DepartmentService } from './department.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = 'http://localhost:3000/departments';

  private productSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  private loaded: boolean = false;

  constructor(
    private http: HttpClient,
    private departmentService: DepartmentService
  ) { }

  get(): Observable<Product[]> {
    if (!this.loaded) {
      combineLatest(
        this.http.get<Product[]>(this.url),
        this.departmentService.get()
      ).pipe(
        tap(([products, departments]) => console.log(products, departments)),
        // esse filter so vai deixar passar a requisicao quanto tanto produtos quanto departamentos estiverem carregados
        // nessa forma de implementar ocorre um erro pois se o carregamento dos departamentos demora mais que o de produtos da null pointer no map
        filter(([products, departments]) => products !=null && departments != null),
        map(([products, departments]) => {
          for(let p of products) {
            let ids = (p.departments as string[]);
            p.departments = ids.map((id) => departments.find(dep => dep._id === id))
          }
          return products;
        }),
        tap((products) => console.log(products))
      ).subscribe(this.productSubject$);
    }
    return this.productSubject$.asObservable();
  }

  add(p: Product): Observable<Product> {
    let departments = (p.departments as Department[]).map((dep) => dep._id)
    //{...p, departments} pega os atributos e substitui os departments
    return this.http.post<Product>(this.url, {...p, departments})
      .pipe(
        tap((prod: Product) => this.productSubject$.getValue()
          .push({...p, _id: p._id}))
      );
  }

  del(dep: Product): Observable<any> {
    // pipe so é executado quando for dado um subscribe
    console.log('aquiii', dep)
    return this.http.delete(`${this.url}/${dep._id}`)
      .pipe(
        // indica que deu certo a chamada
        // tap é usado para fazer qqr coisa antes de enviar o resultado
        tap(() => {
          // remove o department da lista
          let products = this.productSubject$.getValue();
          let i = products.findIndex(d => d._id === dep._id);
          if (i >= 0) {
            products.splice(i, 1);
          }
        })
      );
  }

  update(p: Product): Observable<Product> {
    let departments = (p.departments as Department[]).map((dep) => dep._id)
    return this.http.patch<Product>(`${this.url}/${p._id}`, p)
      .pipe(
        tap(() => {
          let products = this.productSubject$.getValue();
          let i = products.findIndex(prod => prod._id === p._id);
          if (i >= 0) {
            products[i] = p;
          }
        })
      );
  }
}
