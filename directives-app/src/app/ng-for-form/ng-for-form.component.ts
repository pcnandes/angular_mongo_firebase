import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-for-form',
  templateUrl: './ng-for-form.component.html',
  styleUrls: ['./ng-for-form.component.css']
})
export class NgForFormComponent implements OnInit {

  name: string = '';
  address: string = '';
  phone: string = '';
  city: string = '';
  age: number = 0;

  cities = [
    {name: "sao paulo", state: "SP"},
    {name: "rio de janeiro", state: "RJ"},
    {name: "belo horizonte", state: "BH"}
  ]

  clients = []

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.clients.push({
      name: this.name,
      addess: this.address,
      phone: this.phone,
      city: this.city,
      age: this.age
    })
    this.cancel()
    console.log(this.clients)
  }

  cancel() {
    this.name=""
    this.address=""
    this.phone=""
    this.city=""
    this.age=0
  }

  delete(i: number) {
    this.clients.splice(i, 1)
  }

}
