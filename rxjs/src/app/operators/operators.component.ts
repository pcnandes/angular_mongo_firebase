import { Component, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, interval, Observable, Subscription, Subject, timer } from 'rxjs';
import { map, delay, filter, tap, take, first, last, debounceTime, takeWhile, takeUntil } from 'rxjs/operators';
import { MatRipple } from '@angular/material';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  @ViewChild(MatRipple, {static: true}) ripple: MatRipple;

  private serachInput: string = '';

  constructor() { }

  ngOnInit() {
  }

  mapClick() {
    from([1,2,3,4,5,6,7])
    // no pipe posso encadear uma série de operadores e transformar os dados
    .pipe(
      // map funciona como um map JS
      map(i => i*2),
      map(i => 'Number:' + 1),
      // da um atraso no retorno da informacao
      delay(1000)
    )
      .subscribe((i) => console.log(i));

      fromEvent(document, 'click')
        .pipe(
          map((e: MouseEvent) => ({x: e.screenX, y: e.screenY}))
        )
        .subscribe((pos) => console.log(pos));
  }

  filterClick() {
    from([1,2,3,4,5,6,7])
    .pipe(
      // permite filtrar
      filter(i => i % 2 === 1)
    )
    .subscribe((i) => console.log(i));

    interval(1000)
      .pipe(
        filter(i => i % 2 === 0),
        map(i => 'Number:' + i),
      )
      .subscribe((i) => console.log(i))
  }

  tapClick() {
    interval(1000)
      .pipe(
        // a ideia do tap é executar alguma coisa e não modificar o valor
        tap(i => console.warn('Before filter' + i)),
        filter(i => i % 2 === 0),
        // se for filtrado, o after nao é impresso
        tap(i => console.warn('After filter' + i)),
        map(i => 'Number:' + i),
      )
      .subscribe((i) => console.log(i))
  }

  takeClick() {
    const observable = new Observable((observer) => {
      let i; 
      for(i=0; i<20; i++) {
        setTimeout(() => {
          observer.next(Math.floor(Math.random()*100))
        }, i*100);
      }
      setTimeout(() => observer.complete(), i*100);
    })
    const s: Subscription = observable
      .pipe(
        tap(i => console.log(i)),
        // encessa o sunscription depois de N passadas, ele executa um complete. Não é necessário tbm dar unsubscribe
        take(10),
        // igual ao take, porem pega o primeiro
        // first()
        // igual aos anteriores, porem pega o ultimo. Mas o last nao encerra o Observable.
        // last()
      )
      .subscribe(
        v => console.log('Output ' + v),
        (error) => console.error(error),
        () => console.log('Complete'));
  }

  louchRipple() {
    const rippleRef = this.ripple.launch({ persistent: true, centered: true });
    rippleRef.fadeOut();
  }

  debounceTimeClick() {
    fromEvent(document, 'click')
      .pipe(
        tap((e) => console.log('Click')),
        // durante esse intervalo, eu posso gerar n eventos, mas apenas o ultimo será repassado. Nesse exemplo teremos no maximo 1 click por segundo;
        // uma boa utilizacao é para pesquisa no evento de keypress
        debounceTime(1000)
      )
      .subscribe(
        (e: MouseEvent) => {
          console.log("Click with debounce time ", e);
          this.louchRipple();
        }
      )
  }

  searchEntry$: Subject<string> = new Subject<string>();
  searchBy_UsingDebounce(event) {
    this.searchEntry$.next(this.serachInput);
  }

  debounceTimeSearch() {
    this.searchEntry$
      // enquanto tiver sendo digitadas teclas, em 500ms ele nao envia a busca
      .pipe(debounceTime(500))
      .subscribe((s)=> console.log(s));
  }

  takeWhileClick() {
    interval(500)
    // pega o valor enquanto retornar um true
      .pipe(takeWhile((value, index) => (value < 5)))
      .subscribe(
        (i) => console.log('takeWhile', i),
        (error) => console.error(error),
        () => console.log('completed!'))
  }

  takeUntilClick() {
    let dotime$ = timer(5000);

    interval(500)
      // ele espera receber um outro observable que quando gerar o evento ele encerra
      .pipe(takeUntil(dotime$))
      .subscribe(
        (i) => console.log('takeUntil', i),
        (error) => console.error(error),
        () => console.log('completed!'))
  }
}
