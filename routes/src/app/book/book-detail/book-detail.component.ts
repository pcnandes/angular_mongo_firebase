import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  // vai armazenar o book que será passado
  book$: Observable<Book> = null;
  // armazena o index do libro
  index: number;
  authors: string[];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router) { }

  ngOnInit() {
    console.log('Index: ', this.route.snapshot.paramMap.get('index'));
    // forma correta se carregar um atributo passado por parametro e busca-lo em banco
    this.book$ = this.route.paramMap
      .pipe(
        // preencho o index do libro que está sendo passado
        tap((params: ParamMap) => this.index = +params.get('index')),
        // switchMap => conecta dois observables
        switchMap((params: ParamMap) => this.bookService.get( +params.get('index') )),
        // b => book; Pegos os autores
        tap((b) => this.authors = (b) ? b.authors : [] ));

      // nao preciso das subscribe pois a proria tela ja esta fazendo isso
      // .subscribe((params: ParamMap) => console.log("Index: ", params.get('index')))
  }

  remove() {
    this.bookService.remove(this.index);
    this.router.navigateByUrl('books');
  }

  goAuthors() {
    let url = '/books/' + this.index + '/authors';
    // navego para uma url passando os autores
    this.router.navigate([url, {authors: this.authors}])
  }

}
