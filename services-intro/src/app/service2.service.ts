import { Injectable } from '@angular/core';

@Injectable({
  // indica onde será injetado o componente, no caso de root é no modulo principal. Pode ser usado o provider do module tbm
  providedIn: 'root'
})
export class Service2 {

  text: string = 'Service2';

  constructor() {
    console.log('Service2 constructor')
  }
}
