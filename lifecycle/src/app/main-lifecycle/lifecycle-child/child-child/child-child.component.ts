import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child-child',
  templateUrl: './child-child.component.html',
  styleUrls: ['./child-child.component.css']
})
export class ChildChildComponent implements OnInit {

  @Input() name: string;

  constructor() { }

  ngOnInit() {
    console.log('   Child Child (ngOnInit) - ', this.name);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('   Child Child (ngOnChanges) - ', this.name);
  }

  // chamado logo apos o ngOnInit
  ngAfterContentInit() {
    console.log('   Child Child (ngAfterContentInit) - ', this.name);
  }
}
