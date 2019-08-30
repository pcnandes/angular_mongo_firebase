import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  templateUrl: './property-binding.component.html',
  styleUrls: ['./property-binding.component.css']
})
export class PropertyBindingComponent implements OnInit {

  color: string = 'accent';
  btnDisabled: boolean = true;
  colors = ['primary', 'accent', 'warn', ''];
  idx = 0;
  constructor() { }

  // executado automaticamente apos a pagina ser inicializada
  ngOnInit() {
    setInterval(() => {
      this.idx = (this.idx + 1) % this.color.length;
    }, 1000);
  }

}
