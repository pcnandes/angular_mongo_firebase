import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import { Person } from './person.model';
import { HttpClient } from '@angular/common/http';
import { map, mergeAll, mergeMap, switchAll, switchMap, debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-switch-merge',
  templateUrl: './switch-merge.component.html',
  styleUrls: ['./switch-merge.component.css']
})
export class SwitchMergeComponent implements OnInit {

  serachInput: string = '';
  people$: Observable<Person[]>;
  @ViewChild('searchBy', {static: true}) el: ElementRef;

  private readonly url: string = 'http://localhost:9000';

  // o ideal é criar um serviço para isso
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.firstOption();
    // this.secondOption();
    this.thirdOption();
  }

  filterPeople(serachInput: string): Observable<Person[]> {
    if (serachInput.length === 0) {
      return of([]);
    }
    return this.http.get<Person[]>(`${this.url}/${this.serachInput}`);
  }

  // igual a segunda opção, mas discartar as requisiçoes intermediarias caso o usuario clique rapido nas teclas
  thirdOption() {
    // forma mais agradável
    // recupera a tecla clicada
    let keyup$ = fromEvent(this.el.nativeElement, 'keyup');
    // switchMap já faz o serviço de se conectar ao observable e transformar o resultado Observable nos dados retornados
    // this.people$ = keyup$.pipe(switchMap(e => this.filterPeople(this.serachInput)));

    this.people$ = keyup$
      .pipe(
        // nao vai mandar nada até q a digitação fique ociosa em 700ms
        debounceTime(700),
        // switchMap faz o mesmo que o mapMerge, mas ele cancela as requisições anteriores ainda pendentes
        // com isso, nao perde tempo tratando-as
        switchMap(() => this.filterPeople(this.serachInput)));
  }

  secondOption() {
    // recupera a tecla clicada
    let keyup$ = fromEvent(this.el.nativeElement, 'keyup');
    /* uma forma valida de fazer
    // chamo o metodo responsavel por carregar os dados do banco
    let fetch$ = keyup$.pipe(map((e) => this.filterPeople(this.serachInput)));
    // mergeAll() vai automaticamente chamar um subscribe e retornar os dados
    this.people$ = fetch$.pipe(mergeAll());
    */

    // forma mais agradável
    // o mergeMap faz o mesmo que o map e o mergeAll juntos
    // se conecta ao observable e transforma os resultados
    this.people$ = keyup$.pipe(mergeMap((e) => this.filterPeople(this.serachInput)));
  }

  // nessa abordagem nao é legal pq faz um encadeamento de subscribes
  firstOption() {
    // vai gerar um subscription no observable el e capturar tds os clicks
    fromEvent(this.el.nativeElement, 'keyup')
      .subscribe((e) => {
        // o resultado do get já é um observable
        this.filterPeople(this.serachInput)
          .subscribe(res => {
            console.log(res);
          });
      });
  }
}
