import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatCardModule,
  MatSelectModule,
  MatRadioModule,
  MatIconModule,
  MatDividerModule,
  MatProgressBarModule,
  MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputBindingComponent } from './input-binding/input-binding.component';
import { ClientComponent } from './input-binding/client/client.component';
import { EventComponent } from './event/event.component';
import { ChildItemComponent } from './event/child-item/child-item.component';
import { ClientsComponent } from './clients/clients.component';
import { ItemClientComponent } from './clients/item-client/item-client.component';
import { ParentChildComponent } from './parent-child/parent-child.component';
import { TimerComponent } from './parent-child/timer/timer.component';
import { OnChangesComponent } from './on-changes/on-changes.component';
import { NameChangeComponent } from './on-changes/name-change/name-change.component';
import { InterceptingComponent } from './intercepting/intercepting.component';
import { NameComponent } from './intercepting/name/name.component';

@NgModule({
  declarations: [
    AppComponent,
    InputBindingComponent,
    ClientComponent,
    EventComponent,
    ChildItemComponent,
    ClientsComponent,
    ItemClientComponent,
    ParentChildComponent,
    TimerComponent,
    OnChangesComponent,
    NameChangeComponent,
    InterceptingComponent,
    NameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
