import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent implements OnInit {

  private _name = '';

  @Input()
  // quando uso o set o name vira uma propriedade, essa é uma funçãodo TS
  set name(name: string) {
    this._name = 'Your name: ' + (name.toUpperCase().trim() || '<name empty>');
  }

  get name(): string {
    return this._name;
  }

  constructor() { }

  ngOnInit() {
  }

}
