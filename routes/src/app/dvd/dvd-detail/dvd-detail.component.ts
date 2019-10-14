import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DvdService } from 'src/app/services/dvd.service';
import { Observable } from 'rxjs';
import { Dvd } from 'src/app/models/dvd';

@Component({
  selector: 'app-dvd-detail',
  templateUrl: './dvd-detail.component.html',
  styleUrls: ['./dvd-detail.component.css']
})
export class DvdDetailComponent implements OnInit {

  dvd$: Observable<Dvd>;
  title = null;

  constructor(
    private route: ActivatedRoute,
    private dvdService: DvdService,
    // permite navegar nas rotas
    private router: Router) { }

    ngOnInit() {
    // a grande diferença entre o snapshot e o paramMap é que no segundo mudanças na rota sao detectadas. Ou seja, capturo mudanças no index
    // index -> é o mesmo nome dado na criacao da rota
    let index: number = +this.route.snapshot.paramMap.get('index');
    this.dvd$ = this.dvdService.get(index);
    // recuperando os parametros adicionais
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        // verifico se existe o parametro title, se tier eu carrego
        if (params.has('title'))
          this.title = params.get('title');
      })
    // outra forma de pegar
    /*console.log("Index: ", this.route.snapshot.paramMap.get('index'));
    this.route.paramMap
      .subscribe((params: ParamMap) => console.log("Index: ", params.get('index')));*/
  }

  goBack() {
    // indica a rota
    this.router.navigate(['/dvds']);
  }

}
