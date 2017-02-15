import { AppState, ChangeStats } from './types';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DayData } from './day-data';

import { AppSrv } from './app.service';

import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {

  appState$: Observable<AppState>;

  days$: Observable<DayData[]>;
  stats: ChangeStats = {};

  menuIsOpen: boolean = false;

  auth: FirebaseAuthState;

  displayName: string;

  constructor(private appSrv: AppSrv, private af: AngularFire) {

    this.af.database.list('/testItems', {query: {
      orderByChild: 'weight'
    }})
    .subscribe((data: DayData[]) => {
      const sorted = data.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : 0);
      console.log(sorted);
    });

    af.auth.subscribe(auth => {
      console.log(auth);
      this.auth = auth;

      if (auth) {
        const name = auth.auth.displayName;
        this.displayName = name ? name.split(' ')[0] : auth.uid;

      }
    });
  }

  logout() {
    this.af.auth.logout();
  }

  login() {
    this.af.auth.login({
      method: AuthMethods.Popup,
      provider: AuthProviders.Google
    }).then((r) => {
      console.log(r);
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
    // this.appSrv.addDay();
    this.appSrv.testPushData();
  }

  // ngOnChanges() {
  //   this.calcAverages();
  // }


}
