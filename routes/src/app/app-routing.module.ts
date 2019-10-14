import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DvdComponent } from './dvd/dvd.component';
import { BookComponent } from './book/book.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { DvdDetailComponent } from './dvd/dvd-detail/dvd-detail.component';
import { DvdFormComponent } from './dvd/dvd-form/dvd-form.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { BookAuthorsComponent } from './book/book-authors/book-authors.component';

const appRoutes: Routes = [
  { path:'dvds', component: DvdComponent },
  { path:'books', 
    component: BookComponent,
    children: [
      { path:':index', 
        component: BookDetailComponent,
        children: [
          { path: 'authors', component: BookAuthorsComponent}
        ]
      },
    ]
  },
  { path: 'electronics', loadChildren: './electronics/electronics.module#ElectronicsModule'},
  { path:'dvds/new', component: DvdFormComponent },
  // passando parametro
  { path:'dvds/:index', component: DvdDetailComponent },
  // indica uma rota para o home. pathMatch -> indica que a rota tem q ser exatamente igual
  { path: '', pathMatch: 'full', redirectTo: 'dvds' },
  // '**' indica qualquer coisa, ou seja, nenhuma rota mapeada
  { path: '**',  component: PageNotFoundComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // para trabalhar com rotas é preciso usar o RouteModule
    RouterModule.forRoot(appRoutes),
  ], 
  exports: [
    // preciso exportar minhas rotas para que sejam usadas em outros modulos
    RouterModule
  ]
})
export class AppRoutingModule { }