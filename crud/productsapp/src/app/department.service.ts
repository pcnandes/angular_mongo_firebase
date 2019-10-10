import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  readonly url = 'http://localhost:3000/departments';

  private departmentSubject$: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(null);
  private loaded: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Department[]> {
    if (!this.loaded) {
      this.http.get<Department[]>(this.url)
        .pipe(tap((deps) => console.log(deps)))
        .subscribe(this.departmentSubject$);
      this.loaded = true;
    }
    return this.departmentSubject$.asObservable();
  }

  add(d: Department): Observable<Department> {
    // adiciono o department e ja adiciono a lista
    return this.http.post<Department>(this.url, d)
      .pipe(
        tap((dep: Department) => this.departmentSubject$.getValue().push(dep))
      );
  }

  del(dep: Department): Observable<any> {
    // pipe so é executado quando for dado um subscribe
    return this.http.delete(`${this.url}/${dep._id}`)
      .pipe(
        // indica que deu certo a chamada
        // tap é usado para fazer qqr coisa antes de enviar o resultado
        tap(() => {
          // remove o department da lista
          let departments = this.departmentSubject$.getValue();
          let i = departments.findIndex(d => d._id === dep._id);
          if (i >= 0) {
            departments.splice(i, 1);
          }
        })
      );
  }

  update(dep: Department): Observable<Department> {
    return this.http.patch<Department>(`${this.url}/${dep._id}`, dep)
      .pipe(
        tap((d) => {
          let departments = this.departmentSubject$.getValue();
          let i = departments.findIndex(d => d._id === dep._id);
          if (i >= 0) {
            departments[i].name = d.name;
          }
        })
      );
  }
}
