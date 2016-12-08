import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DayData } from './day-data';

import { AppSrv, AppState } from './app.service';

import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {

  appState$: Rx.Observable<AppState>;

  days$: Rx.Observable<DayData[]>;

  calsAverage: number;
  weightAverage: number;
  weightChangeAvg: number;
  calsOffsetAvg: number;

  constructor(private appSrv: AppSrv) {
  }


  ngOnInit() {
    this.appState$ = this.appSrv.appState$.asObservable();

    let { appState$ } = this;

    appState$.subscribe(state => {
      this.calsAverage = state.calsAverage;
      this.weightAverage = state.weightAverage;
      this.weightChangeAvg = state.weightChangeAvg;
      this.calsOffsetAvg = state.calsOffsetAvg;
    });

    this.days$ = appState$
                  .map(d => d.days)
                  .distinctUntilChanged();

    // this.days$.subscribe(console.log);

    // this.days$.map(d => d.length)
    //           .distinctUntilChanged()
    //           .subscribe(console.log);

    this.appSrv.calcAverages();

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.appSrv.start();
    }, 200);
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
