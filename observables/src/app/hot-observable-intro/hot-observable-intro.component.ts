import { Observable, Observer, fromEvent } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-hot-observable-intro',
  templateUrl: './hot-observable-intro.component.html',
  styleUrls: ['./hot-observable-intro.component.css']
})
export class HotObservableIntroComponent implements OnInit {

  @ViewChild('myButton', {static: true}) button: ElementRef;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  ngOnInit() {
    // fromEvent -> le o evento de um elemento. Deve ser passado o componente e o evento que quero capturar
    // nesse exempo, nao importa quantos subscribes ele tenha, todos serão chamados no click do botao ao mesmo tempo
    let myButtonClickObservable: Observable<any> = fromEvent(
      this.button.nativeElement, 'click'
    );
    myButtonClickObservable.subscribe((event) => console.log('button clicked 1'));
    myButtonClickObservable.subscribe((event) => console.log('button clicked 2'));

    class Producer {
      private myListeners  = [];
      private n = 0;
      private interval;

      // crio um array de ouvintes
      addListener(l) {
        this.myListeners.push(l);
        console.log('qtd observables ' + this.myListeners.length);
      }

      // gera numeros aleatorios a cada 3 segundos
      start() {
        this.interval = setInterval(() => {
          this.n++;
          console.log('From producer ' + this.n);

          // percorro todos os ouvistes e retono o mesmo valor para todos
          for(let l of this.myListeners) {
            // chamo o metodo passado para o listener retornado o n
            l(this.n)
          }
        }, 1000)
      }

      stop() {
        clearInterval(this.interval);
      }
    };

    // instancio a classe producer
    let producer: Producer = new Producer();
    // chamo o metodo start q é o cara q vai gerar numeros a cada segundo
    producer.start();

    // apos 3 segundos começa a imprimir os numeros gerados
    setTimeout(() => {
      producer.addListener((n) => console.log('From listener 1', n));
      producer.addListener((n) => console.log('From listener 2', n));
    }, 4000)
    

    // usando observable para imprimir os valores
    const myHotObservable = new Observable(
      (observer: Observer<number>) => {
        // ao inscrever-se eu apenas chamo o next passando o resultado do listener gerado pela classe producer
        producer.addListener((n) => observer.next(n))
      }
    );

    // toda vez q me inscrevo estarei adicionando um listener na classe
    myHotObservable.subscribe((n) => console.log('From subscribe 1', n));
    myHotObservable.subscribe((n) => console.log('From subscribe 2', n));
  }

}
