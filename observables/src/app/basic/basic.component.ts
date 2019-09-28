import { Component, OnInit } from '@angular/core';
import { Observable, Observer, interval, Subscription } from 'rxjs';

/*
* Exempo simples do uso do Observable RXJS
*/

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  subscription1: Subscription;
  subscription2: Subscription;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  ngOnInit() {
    const myFirstObservable = new Observable(
      // indicar no Observer o tipo de dado que será gerado por esse Observable
      (observer: Observer<number> ) => {
        // next é o cara q vai gerar o dado, o retorno do meu observable
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
        // qualquer coisa pode ser passada para o error
        observer.error('error');
        observer.complete();
      }
    );

    // subscribe será chamado quando o observable retornar algo
    // subscribe recebe tres métodos
    myFirstObservable.subscribe(
      // valores retornados pelo observable. n tem q ser do mesmo tipo de retorno o observable
      (n: number) => console.log(n),
      // retorna em caso de erro
      (error) => console.error(error),
      // esse ultimo método é chamado quando o observable termina de passar os dados
      () => console.log('completed')
    )

    // interval => método do RXJS que executa alguma coisa em determinado intervalo de tempo
    /*
    const timerCount = interval(500);
    timerCount.subscribe(
      (n) => console.log(n)
    )
    console.log('after interval'); */

    this.s1 = 'Initializing...';
    this.s2 = 'Initializing...';
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
    this.subscription1 = myIntervalObservable.subscribe(
      (_n) => {this.n1 = _n},
      (error) => {this.s1 = ' Error: ' + error},
      () => {this.s1 = 'Completed'}
    );

    this.subscription2 = myIntervalObservable.subscribe(
      (_n) => {this.n2 = _n},
      (error) => {this.s2 = ' Error: ' + error},
      () => {this.s2 = 'Completed'}
    );

    // fez um timer tosco para se desenscrever no observable
    // é importante se desencrever pois esses objetos ficam guardados na memoria
    setTimeout(() => {
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 4000)
  }

}
