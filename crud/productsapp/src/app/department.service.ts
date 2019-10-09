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
}
