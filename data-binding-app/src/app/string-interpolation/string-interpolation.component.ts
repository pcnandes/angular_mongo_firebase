import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-interpolation',
  templateUrl: './string-interpolation.component.html',
  styleUrls: ['./string-interpolation.component.css']
})
export class StringInterpolationComponent implements OnInit {

  person = {
    fistName: 'john',
    lastName: 'aaaaa',
    age: 50,
    address: 'rua 123'
  };

  constructor() { }

  ngOnInit() {
  }

}
