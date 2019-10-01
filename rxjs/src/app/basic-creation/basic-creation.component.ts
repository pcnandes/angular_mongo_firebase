import { Component, OnInit } from '@angular/core';
import { Observable, Observer, from, of, interval, timer, Subscription, fromEvent } from 'rxjs';
import { Source } from 'webpack-sources';

@Component({
  selector: 'app-basic-creation',
  templateUrl: './basic-creation.component.html',
  styleUrls: ['./basic-creation.component.css']
})
export class BasicCreationComponent implements OnInit {

  // permite receber o resultado de um subscribe, ou de varios com o add. Além disso, permite se desenscrever de todos os subscriptions envolvidos
  subscription: Subscription = new Subscription();

  constructor() { }

  ngOnInit() {
  }

  observableCreate() {
    // outra forma de criar um observable
    const hello = Observable.create((observer: Observer<string>) => {
      observer.next('hello');
      observer.next('from');
      observer.next('observable');
      observer.complete();
    });
    hello.subscribe(val => console.log(val));
  }

  fromClick() {
    // por baixo dos panos o from vai dar next em cada um dos itens abaixo
    // from recebe um array
    from([1, 2, 3, 4, 5, {x: 10, y:20}])
      .subscribe(val => console.log(val));

    // o from pode ser associado a uma variavel e o subscribe feito depois
    const source = from([1, 2, 3, 4, 5, {x: 10, y:20}]);
    source.subscribe((v) => console.error(v));
    source.subscribe((v) => console.warn(v));
  }

  ofClick() {
    // of retorna apenas um objeto, ou seja, da apenas um next passando o valor
    of([1, 2, 3, 4, 5, {x: 10, y:20}])
      .subscribe(val => console.log(val));
  }

  intervalClick() {
    // o interval define uma periodicidade para chemar o evento
    const source = interval(1000);
    // para parar de gerar, é preciso dar um unsubscribe
    this.subscription.add(source.subscribe((v) => console.log(v)));
  }

  timerClick() {
    // se passar apenas um valor ele gera apenas uma vez
    const source = timer(1000);
    this.subscription.add(source.subscribe((v) => console.log(v)));

    // depois de 3 segundos ele gera de 1000 em 1000
    const source2 = timer(3000, 1000);
    this.subscription.add(source2.subscribe((v) => console.log(v)));
  }

  // event serve para capturar eventos de um componente de tela
  fromEventClick() {
    // document ja é uma variavel usado no angular e representa o documento inteiro
    // poderia passar tbm um ViewChild e pegar os eventos de um documento específico
    // 'click' é o evento que quero capturar
    const subscription = fromEvent(document, 'click')
      .subscribe((e)=> {
        console.log(e);
      })
    this.subscription.add(subscription);
  }

  unsubscribeClick() {
    // o unsubscribe se desinsreve de todos os subscriptions adicionados e mata o subscription
    this.subscription.unsubscribe();

    // inicio uma nova instancia para o caso de querer me inscrever novamente
    this.subscription = new Subscription();
  }
}
