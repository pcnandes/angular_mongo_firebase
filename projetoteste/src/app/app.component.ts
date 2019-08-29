import { Component } from '@angular/core';

@Component({
  // apelido do meu component
  selector: 'app-root',
  // parte html do component
  templateUrl: './app.component.html',
  // arvore de estilo do component
  styleUrls: ['./app.component.css']
})
// define a classe que será usada pelo component
export class AppComponent {
  title = 'projetotesteeeee';
}
