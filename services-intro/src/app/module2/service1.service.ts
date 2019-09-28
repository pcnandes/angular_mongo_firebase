import { Module1Module } from './../module1/module1.module';
import { Injectable } from '@angular/core';

@Injectable({
  // indica em qual module será provido o componente, pode ser usado o provider do module tbm
  providedIn: Module1Module
})
export class Service1 {

  public num: number;
  constructor() {
    this.num = Math.round(Math.random() * 1000);
    console.log('Service1 constructor');
  }
}
