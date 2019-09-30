import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject, ConnectableObservable } from 'rxjs';
import { publish, refCount, share } from 'rxjs/operators'

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {
  n: number = 0;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  myObservable: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.myObservable = new Observable(
      (observer: Observer<number>) => {
        let i: number = 0;
        console.log('%c Observable Creates', 'background: #cccc; color: red;');
        console.log('%c Repare que assim que a aplicação inicia, ele se inscrebe no Observable, depois de 2 segundos no observable1 e apos 4 no 2 ', 'background: #cccc; color: red;')
        setInterval(()=> {
          i++;
          console.log('%c I gerado: ' + i, 'background: #cccc; color: blue;');
          (i=== 100) ? observer.complete() : observer.next(i);
        }, 1000);
      }
    );

    // formas de esquentar um observable, ou seja, fazer com que todos os observadores recebam o mesmo dado
    // this.usingSubjects();
    //this.usingPublish()
    this.usingShare();
  }
  // subject é um Observable e um observer ao mesmo tempo
  usingSubjects() {
    const subject = new Subject<number>();
    // como subject tbm é um observer eu posso passar ele no subscribe para meu Observable
    // dessa forma, teremos apenas um Observable gerando os dados e todos os inscritos nesse subscribe receberão os dados
    this.myObservable.subscribe(subject);

    this.s1 = 'waiting for interval...';

    // subscriber 1 - apos 2 segundo me inscrevo no subject
    setTimeout(() => {
      // o subject tem é Observable
      // aqui estou me inscrevendo no subscibe que por sua vez está inscrito em um Observable
      subject.subscribe((_n) => {
        this.n1 = _n;
        this.s1 = 'ok';
      });
    }, 2000)

    this.s2 = 'waiting for interval...';

    // subscriber 2 - após 4 segundos me inscrevo no subjsct 2
    setTimeout(() => {
      subject.subscribe((_n) => {
        this.n2 = _n;
        this.s2 = 'ok';
      });
    }, 4000)
  }

  // diferente do subjects, o publish so inicia o observable quando ocorre o primeiro subscribe
  usingPublish() {
    /*
    // Funcao que consegue aplicar alguns filtros e transfomações nos dados retornados no observable
    const multcasted = this.myObservable.pipe(
      // vai publicar os dados como um subject, ou seja, permitirá q outros se inscrevam
      publish(),
      // conecta o publish ao observable, permitindo que outros se inscrevam nesse publish. A conexão so ocorre no primeiro subsribe
      refCount()
    );
    */ 
    // nesse exemplo estou criando apenas uma conexao com o observable
    const multcasted: ConnectableObservable<number> = this.myObservable.pipe(publish()) as ConnectableObservable<number>;
    // dessa forma eu posso forçar o momento da conexao 
    multcasted.connect();

    this.s1 = 'waiting for interval...';
    // subscriber 1 - apos 2 segundo me inscrevo no publish
    setTimeout(() => {
      multcasted.subscribe((_n) => {
        this.n1 = _n;
        this.s1 = 'ok';
      });
    }, 2000)

    this.s2 = 'waiting for interval...';

    // subscriber 2 - após 4 segundos me inscrevo no publish 2
    setTimeout(() => {
      multcasted.subscribe((_n) => {
        this.n2 = _n;
        this.s2 = 'ok';
      });
    }, 4000)
  }


  // o share funciona parecido com o subject, so vai iniciar após o primeiro subject
  // a diferença do share é que após um completed, se ocorrer outro subscribe ele começa a gerar os dados novamente
  usingShare() {
    const multcasted =  this.myObservable.pipe(share());
    this.s1 = 'waiting for interval...';
    // subscriber 1 - apos 2 segundo me inscrevo no publish
    setTimeout(() => {
      multcasted.subscribe((_n) => {
        this.n1 = _n;
        this.s1 = 'ok';
      });
    }, 2000)

    this.s2 = 'waiting for interval...';

    // subscriber 2 - após 4 segundos me inscrevo no publish 2
    setTimeout(() => {
      multcasted.subscribe((_n) => {
        this.n2 = _n;
        this.s2 = 'ok';
      });
    }, 4000)
  }
}
