import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.css']
})
export class ColdObservablesComponent implements OnInit {

  subscription1: Subscription;
  subscription2: Subscription;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  ngOnInit() {
    this.s1 = 'Initializing...';
    this.s2 = 'Initializing...';

    // nesse exemplo, cada subscribe gera um Observable, com isso, cada um vai gerar seu dado
    // isso é chamado de cold observable. Serão gerados dados diferentes para cada subscribe
    const myIntervalObservable = new Observable(
      // indicar no Observer o tipo de dado que será gerado por esse Observable
      (observer: Observer<any> ) => {
        let i: number = 0;
        let interval = setInterval(() => {
          i++;
          console.log('from observable ', i)
          // se chegar no 10 ele completa meu Observable
          if (i === 10) observer.complete();
          // retorna os numeros pares
          else if (i%2 === 0) {
            observer.next(i);
          }
        }, 1000);
        // esse returnn é chamado quando o completed é chamado
        return () => {
          clearInterval(interval)
        }
      }
    );

    this.s1 = 'Waiting fpr interval';
    this.subscription1 = myIntervalObservable.subscribe(
      (_n) => {this.n1 = _n},
      (error) => {this.s1 = ' Error: ' + error},
      () => {this.s1 = 'Completed'}
    );

    this.s2 = 'Waiting fpr interval';
    setInterval(() => {
      this.subscription2 = myIntervalObservable.subscribe(
        (_n) => {this.n2 = _n},
        (error) => {this.s2 = ' Error: ' + error},
        () => {this.s2 = 'Completed'}
      );
    }, 3000)


    // fez um timer tosco para se desenscrever no observable
    // é importante se desencrever pois esses objetos ficam guardados na memoria
    setTimeout(() => {
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 4000)
  }

}
