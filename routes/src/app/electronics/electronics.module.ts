import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronicsRoutingModule } from './electronics-routing.module';
import { ElectronicListComponent } from './electronic-list/electronic-list.component';
import { ElectronicDetailComponent } from './electronic-list/electronic-detail/electronic-detail.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [ElectronicListComponent, ElectronicDetailComponent],
  imports: [
    CommonModule,
    ElectronicsRoutingModule,
    // preciso importar o modulo do material, apesar de ter importado no module principal
    MaterialModule
  ]
})
export class ElectronicsModule { }
