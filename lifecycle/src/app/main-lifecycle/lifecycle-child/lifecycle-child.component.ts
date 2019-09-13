import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges, AfterContentInit, AfterViewInit } from '@angular/core';

export interface LifeCycleEvent {
  id: number;
  name: string;
  color: string;
}

@Component({
  selector: 'app-lifecycle-child',
  templateUrl: './lifecycle-child.component.html',
  styleUrls: ['./lifecycle-child.component.css']
})
export class LifecycleChildComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit, AfterViewInit {

  @Input() name: string;
  @Input() age: number;
  @Input() food: string;

  public events: LifeCycleEvent[] = [];
  nextEventId: number = 0;
  colors: string[] = ['accent', 'warn', 'primary'];

  private intervalRef = null;

  // primeiro a ser chamado, as variaveis/ inputs ainda não estao setadas
  constructor() {
    console.log(this.name + ' - constructor');
    this.newEvent('constructor');
    this.intervalRef = setInterval(() => {
      console.log('interval');
    }, 2000);
  }

  // segundo hook a ser chamado. Aqui os inputs já estao definidos
  // simple change retorna os atributos q foram alterados, com valor anterior e atual
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(this.name + ' - ngOnChanges');
    this.newEvent('ngOnChanges');
    /*
    if (changes['name']) {
      console.log('new Name: ' + changes['name'].currentValue)
    } */
    for (let propName in changes) {
      console.log('atributo alterado:', propName);
      console.log('propriedade', changes[propName]);
    }
  }

  // terceiro hook
  // chamado logo apos o ngOnChanges, mas somente na primeira vez q o componente é criado
  // todos os inputs iniciais foram iniciados
  // local ideal para fazer inicializacoes
  ngOnInit() {
    console.log(this.name + ' - ngOnInit');
    this.newEvent('ngOnInit');
  }

  // quarto hook
  // chamado logo apos o ngOnInit
  // aqui os componentes filhos são criados
  ngAfterContentInit() {
    console.log(this.name + ' - ngAfterContentInit');
    this.newEvent('ngAfterContentInit');
  }

  // quinto hook
  ngAfterViewInit() {
    console.log(this.name + ' - ngAfterViewInit');
    this.newEvent('ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log(this.name + ' - ngOnDestroy');
    this.newEvent('ngOnDestroy');
    clearInterval(this.intervalRef);
  }

  newEvent(name: string) {
    let id = this.nextEventId++;
    this.events.push(
      {
        id,
        name,
        color: this.colors[id % this.colors.length]
      });
    setTimeout(() => {
      let idx = this.events.findIndex((e) => e.id == id)
      if (idx >= 0) {
        this.events.slice(idx, 1);
      }
    }, 2000 + this.events.length * 1000) ;
  }
}
