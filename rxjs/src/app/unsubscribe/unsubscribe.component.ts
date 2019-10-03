import { Component, OnInit } from '@angular/core';
import { interval, fromEvent, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {

  private subscriptionAreActives: boolean = false;
  private subscriptions: Subscription[] = [];
  // umas das maneiras mais elegantes de garantir todas as desinscricoes
  private unsubscribeAll$: Subject<any> = new Subject<any>();
  // outra forma de fazer o unsubscribe
  private intervalSubscription: Subscription = null;

  constructor() { }

  ngOnInit() {
    this.checksSubscriptions();
  }

  checksSubscriptions() {
    this.intervalSubscription = interval(100)
      .subscribe(() => {
        let active = false;
        this.subscriptions.forEach((s) => {
          if (!s.closed)
            active = true;
        })
        this.subscriptionAreActives = active;
    })
  }

  subscribe() {
    // vai gerar 100 subscribes
    const subscription1 = interval(100)
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((i)=>{
        console.log(i);
      })

    // vai gerar um subscribe a cada movimento do mouse
    const subscription2 = fromEvent(document, 'mousemove')
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((e) => console.log(e));

    this.subscriptions.push(subscription1);
    this.subscriptions.push(subscription2);
  }

  unsubscribe() {
    this.unsubscribeAll$.next()
    if (this.intervalSubscription != null)
    this.intervalSubscription.unsubscribe();
  }

  ngOnDestroy() {
    // o ideal é sempre se desinscrever de todos os observables
    this.unsubscribe();
  }

}
