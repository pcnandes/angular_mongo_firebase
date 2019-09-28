import { Service1 } from './../service1.service';
import { Component, OnInit } from '@angular/core';
import { Service2 } from 'src/app/service2.service';

@Component({
  selector: 'app-component2',
  // se ficar aqui, será gerada uma instancia para esse componente, para uma instancia global, colocar o provider no module
  // providers: [ Service1 ],
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css']
})
export class Component2Component implements OnInit {

  num = 0;
  text = '';

  // automaticamente o myService1 vira atributo da classe
  constructor(
    private myService1: Service1,
    private myService2: Service2,
  ) { }

  ngOnInit() {
    this.num = this.myService1.num;
    this.text = this.myService2.text;
  }

}
