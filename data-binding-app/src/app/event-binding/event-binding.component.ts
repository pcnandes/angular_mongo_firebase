import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  templateUrl: './event-binding.component.html',
  styleUrls: ['./event-binding.component.css']
})
export class EventBindingComponent implements OnInit {

  buttonName = 'myButton';
  i = 0;
  spinnerMode = 'determinate';
  btnEnable = true;
  selectDisabled = false;
  selectedOption = '1';
  inputName = 'john';
  constructor() { }

  ngOnInit() {
  }

  save() {
    console.log('click');
  }

  inc() {
    this.i++;
    this.buttonName = 'it was clicked' + this.i;
  }

  disable() {
    this.btnEnable = false;
    this.spinnerMode = 'indeterminate';
    setTimeout(() => {
      this.btnEnable = true;
      this.spinnerMode = 'determinate';
    }, 3000);
  }
  cbChange(event) {
    console.log('clicked', event.checked);
    this.selectDisabled = event.checked;
  }
  selectionChange(event) {
    console.log('selected', event);
    this.selectedOption = event.value;
  }
  /*
  inputEvent(event) {
    console.log(event.target.value);
  } */
}
