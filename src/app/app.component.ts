import { AppState, ChangeStats } from './types';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DayData } from './day-data';

import { AppSrv } from './app.service';

import { AngularFire, AngularFireAuth, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {

  appState$: Observable<AppState>;

  days$: Observable<DayData[]>;
  stats: ChangeStats = {};

  constructor(private appSrv: AppSrv, af: AngularFire) {


    af.auth.subscribe(auth => {
      console.log(auth);
      if (!auth) {
        af.auth.login({
          method: AuthMethods.Popup,
          provider: AuthProviders.Google
        }).then((r) => {
          console.log(r);
        });
      }
    });



  }


  ngOnInit() {
    this.appState$ = this.appSrv.appState$.asObservable();
    let { appState$ } = this;

    // appState$.subscribe();

    appState$
      .map(s => s.stats)
      .distinctUntilChanged()
      .subscribe(stats => this.stats = stats);

    // this.stats$.subscribe(console.log);

    this.days$ = appState$
                  .map(d => d.days)
                  .distinctUntilChanged();

    // this.days$.subscribe(console.log);

    // this.days$.map(d => d.length)
    //           .distinctUntilChanged()
    //           .subscribe(console.log);

    // this.appSrv.calcAverages();

  }

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
  }

  updateDay(newDay: DayData) {
    this.appSrv.updateDay(newDay);
  }

  addDay() {
    this.appSrv.addDay();
  }

  // ngOnChanges() {
  //   this.calcAverages();
  // }


}
