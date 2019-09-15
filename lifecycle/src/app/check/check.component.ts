import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  @Input() test: string;

  private name: string = ''
  private age: number = 0;

  constructor() { 
    console.log('constructor')
  }

  ngOnInit() {
    console.log('ngOnInit')
  }

  ngOnChanges() {
    console.log('ngOnChanges')
  }

  // chamado a cada alteracao de estado na minha pagina. ex. cliques de botao, teclas, ao soltar uma tecla, etc..
  // tomar cuidado para nao entrar em loop
  ngDoCheck() {
    console.log('ngDoCheck')
  }
  
  // roda logo apos o ngDoCheck
  ngAfterContentInit() {
    console.log('ngAfterContentInit')
  }

  // roda logo apos o ngAfterContentInit
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked')
  }

  // ja iniciei a view e rodos os objetos filhhos
  ngAfterViewInit() {
    console.log('ngAfterViewInit')
  }

  // indica que ja chequei todos os componentes filhos
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked')
  }

  ngOnDesdroy() {
    console.log('ngDesdroy')
  }
}
