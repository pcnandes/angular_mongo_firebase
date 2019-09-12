import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges, AfterContentInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-lifecycle-child',
  templateUrl: './lifecycle-child.component.html',
  styleUrls: ['./lifecycle-child.component.css']
})
export class LifecycleChildComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit, AfterViewInit {

  @Input() name: string;
  @Input() age: number;
  @Input() food: string;

  // primeiro a ser chamado, as variaveis/ inputs ainda não estao setadas
  constructor() {
    console.log(this.name + ' - constructor');
  }

  // segundo hook a ser chamado. Aqui os inputs já estao definidos
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.name + ' - ngOnChanges');
  }

  // terceiro hook
  ngOnInit() {
    console.log(this.name + ' - ngOnInit');
  }

  // quarto hook
  ngAfterContentInit() {
    console.log(this.name + ' - ngAfterContentInit');
  }

  // quinto hook
  ngAfterViewInit() {
    console.log(this.name + ' - ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log(this.name + ' - ngOnDestroy');
  }

}
