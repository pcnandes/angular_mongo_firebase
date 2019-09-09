import { Client } from './client.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  
  name: string;
  age: number;
  clients: Client[] = [];

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.clients.push({
      name: this.name, age: this.age
    });
    this.name = '';
    this.age = 0;
  }
}
