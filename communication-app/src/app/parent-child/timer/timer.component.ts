import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  private interval: any;
  private milisecond: number = 0;
  private running: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  start() {
    if (!this.running) {
      this.interval = setInterval(() => {
        this.milisecond += 50;
      }, 50);
      this.running = true;
    }
  }

  stop() {
    if (this.running) {
      clearInterval(this.interval);
      this.running = false;
    }
  }

  clear() {
    this.milisecond = 0;
  }

  private round(n: number) {
    return Math.round(n);
  }
}
