import { Component, OnInit, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataModel } from 'src/app/datamodel';

@Component({
  selector: 'app-subjects-child',
  templateUrl: './subjects-child.component.html',
  styleUrls: ['./subjects-child.component.css']
})
export class SubjectsChildComponent implements OnInit {

  @Input() subject: Subject<DataModel>;
  @Input() name: string;
  @Input() description: string;

  private log: string[] = [];
  private connected: boolean = false;
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
  }

  logData(data: DataModel) {
    this.log.push('Timestamp: ' + data.timestamp + ' Data: ' + data.data);
  }

  connect() {
    this.log.push('Connected!!');
    this.subscription = this.subject.subscribe(
      // dado q estamos recebendo pelo observable
      (data: DataModel) => {
        this.connected = true;
        this.logData(data);
      },
      // chamado em caso de erro
      (error) => { this.connected = false },
      // chamado ao terminar (completed)
      () => {
        this.connected = false;
        this.log.push('Finished')
      }
    );
  }

  disconnect() {

  }

}
