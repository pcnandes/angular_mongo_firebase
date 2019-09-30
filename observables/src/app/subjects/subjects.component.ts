import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let s: Subject<number> = new Subject<number>();
    // o subscribe se conecta ao Subject e fica ouvindo. Aqui estou pegando o retorno e imprimindo
    s.subscribe(n => console.log(n));

    // gerando dados no meu ubscribe
    s.next(1);
    s.next(2);
    s.next(3);
    s.next(4);
    s.next(5);
    s.next(6);
    s.complete();
  }

}
