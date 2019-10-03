import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError, timer, observable } from 'rxjs';
import { nextTick } from 'q';
import { map, tap, catchError, retry, retryWhen, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-error-handing',
  templateUrl: './error-handing.component.html',
  styleUrls: ['./error-handing.component.css']
})
export class ErrorHandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  startTest() {
    let obj: Observable<any> = new Observable((observer) => {
      for(let i=0; i<10; i++) {
        if(i===7) {
          observer.error(`An error occurred when i = ${i}`)
        } else {
          observer.next(i)
        }
      }
    });
    obj
      .pipe(
        map(i=>i*10),
        tap(i=>console.log('Before error handing' + i)),
        // captura um erro durante a geração dos dados
        catchError(error => {
          console.error('Inside catch Error' + error)
          // of cria um observable para ser retornado
          // posso simplesmente retornar um valor em caso de erro
          // return of(0);
          // ou posso disparar uma excessão
          return throwError('throwError: Error')
        }),
        // tenta n vezes em caso de erro
        // retry(2),
        // recebe um observable dizendo quando ele deve tentar, no exemlo abaixo, tenta depois de 2 segundos
        retryWhen(i => timer(2000))
      )
      .subscribe(
        (i) => console.log(`Saida normal ${i}`),
        err => console.error(`Error ${err}`),
        () => console.log('Fim!')
      );

    let obj2: Observable<any> = new Observable((observer) => {
      timer(2000).subscribe((n) => observer.next(1000));
      timer(2500).subscribe((n) => observer.complete());
    });
    obj2
      .pipe(
        // tempo de espera para completar o observable, se nao completar nesse tempo ele retorna um TimeoutError
        timeout(1000)
      )
      .subscribe(
        (i) => console.log(`Saida normal ${i}`),
        err => console.error(`Error ${err}`),
        () => console.log('Fim!')
      )
  }

}
