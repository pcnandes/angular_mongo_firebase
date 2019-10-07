import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './product.module';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';
import { DialogEditProductComponent } from './dialog-edit-product/dialog-edit-product.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-client';

  simpleReqProductsObs$: Observable<Product[]>;
  productsErrorHandling: Product[];
  productsLoading: Product[];
  bLoading: boolean = false;
  productsId: Product[];
  newlyProducts: Product[] = [];
  productsToDelete: Product[] = [];
  productsToEdit: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
  }

  getSimpleHttpRequest() {
    this.simpleReqProductsObs$ = this.productsService.getProdutos();
  }

  getProductsWithErrorHandling() {
    this.productsService.getProdutosErr()
      .subscribe(
        (prods) => this.productsErrorHandling = prods,
        // tratamento de erro
        (err) => {
          console.log(err);
          console.log('Mensagem: ' + err.error.msg);
          console.log('Status' + err.status);
          let config = new MatSnackBarConfig();
          config.duration = 2000;
          // essas classes precisam ser globais e estar dentro de styles.css
          config.panelClass = ['snack_error'];
          if(err.status === 0)
            this.snackBar.open('Cold not connect to the server', '', config);
          else
            this.snackBar.open(err.error.msg, '', config);
        }
      )
  }

  getProductsWithErrorHandlingOK() {
    this.productsService.getProdutosDelay()
      .subscribe(
        (prods) => {
          this.productsErrorHandling = prods;
          let config = new MatSnackBarConfig();
          config.duration = 2000;
          config.panelClass = ['snack_ok'];
          this.snackBar.open('Success loaded', '', config);
        }
      ),
      (err) => console.log(err)
  }

  getProductsLoading() {
    this.bLoading = true;
    this.productsService.getProdutosDelay()
      .subscribe(
        (prods) => {
          this.productsLoading = prods;
          this.bLoading = false;
        },
        (err) => {
          console.log(err)
          this.bLoading = false;
        }
      )
  }

  loadName(id: string) {
    this.productsService.getProdutosName(id)
      .subscribe((name) => {
        let index = this.productsId.findIndex(p => p._id===id);
        if(index >= 0) {
          this.productsId[index].name =  name;
        }
      })
  }

  getProductsIds() {
    this.productsService.getProdutosIds()
      .subscribe((ids) => {
        this.productsId = ids.map(id => ({_id: id, name: '', department: '', price: 0}));
      })
  }

  saveProduct(name: string, department: string, price: number) {
    const p = {name, department, price}
    this.productsService.saveProduct(p)
      .subscribe(
        (p: Product) => {
          this.newlyProducts.push(p);
        },
        (err) => {
          console.error(err);
          let config = new MatSnackBarConfig();
          config.duration = 2000;
          // essas classes precisam ser globais e estar dentro de styles.css
          config.panelClass = ['snack_error'];
          if(err.status === 0)
            this.snackBar.open('Cold not connect to the server', '', config);
          else
            this.snackBar.open(err.error.msg, '', config);
        }
      )
  }

  loadProductsToDelete() {
    this.productsService.getProdutos()
      .subscribe((prods) => this.productsToDelete = prods);
  }

  deleteProduct(p: Product) {
    this.productsService.deleteProducts(p)
      .subscribe(
        (res) => {
          let i = this.productsToDelete.findIndex(prod => p._id === prod._id);
          if (i >= 0) {
            this.productsToDelete.splice(i, 1);
          }
        },
        (err) => {
          console.error(err);
        }
      );
  }

  loadProductsToEdit() {
    this.productsService.getProdutos()
      .subscribe((prods) => this.productsToEdit = prods);
  }

  editProduct(p: Product) {
    let newProduct: Product = {...p}
    let dialogRef = this.dialog.open(DialogEditProductComponent, {width: '400px', data: newProduct});
    dialogRef.afterClosed()
      .subscribe((prod) => {
        if(prod) {
          this.productsService.editProducts(prod)
            .subscribe(
              (resp) => {
                let i = this.productsToEdit.findIndex(prod => p._id === prod._id);
                if (i >= 0) {
                  this.productsToEdit[i] = resp;
                }
              },
              (err) => {}
            )
        }
      })
  }
}
