import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-book-authors',
  templateUrl: './book-authors.component.html',
  styleUrls: ['./book-authors.component.css']
})
export class BookAuthorsComponent implements OnInit {

  // a propria tela faz o subscribe e unsubscribe
  authors$: Observable<string[]>;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    // console.log('BookAuthorsComponent');

    // recupero os parametros e como foi passado um array, o mesmo vem dividido em strings
    this.authors$ = this.route.paramMap
      .pipe(
        // no lugar de dar um subscribe, retorno o Observable
        map((params: ParamMap) => (params.get('authors').split(','))))
  }

}
