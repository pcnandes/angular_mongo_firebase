import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-name-change',
  templateUrl: './name-change.component.html',
  styleUrls: ['./name-change.component.css']
})
export class NameChangeComponent implements OnInit, OnChanges {

  @Input() name: string;
  nameBefore: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
    console.log(changes);
    // verifico se existe a propriedade name q é o atributo que quero capturar a mudança
    if (changes.hasOwnProperty('name')) {
      this.nameBefore = changes['name'].previousValue;
    }
  }
}
