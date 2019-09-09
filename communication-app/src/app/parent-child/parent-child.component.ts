import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-parent-child',
  templateUrl: './parent-child.component.html',
  styleUrls: ['./parent-child.component.css']
})
export class ParentChildComponent implements OnInit {

  // pode ser indicado o nome do componente de tela
  // @ViewChild("stopwatch", {static: true})
  @ViewChild(TimerComponent, {static: false})
  private myTimer: TimerComponent;


  @ViewChild('myP', {static: false})
  private myP: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  start() {
    this.myTimer.start();
  }

  stop() {
    this.myTimer.stop();
  }

  clear() {
    this.myTimer.clear();
  }

  // chamado apos todos os componentes estarem iniciados
  // só nesse ponto consigo pegar as refencias das variaveis instanciadas
  ngAfterViewInit() {
    console.log(this.myP);
  }
}
