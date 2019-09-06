import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  templateUrl: './ng-for.component.html',
  styleUrls: ['./ng-for.component.css']
})
export class NgForComponent implements OnInit {

  names = [
    "ana",
    "joao",
    "pedro",
    "marcos"
  ]

  cities = [
    {name: "sao paulo", state: "SP"},
    {name: "rio de janeiro", state: "RJ"},
    {name: "belo horizonte", state: "BH"}
  ]
  constructor() { }

  ngOnInit() {
  }

}
