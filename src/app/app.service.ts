import { FirebaseAuthState } from 'angularfire2/auth';
import { DaysService } from './days.service';
import { AppState } from './types';
import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import {DayData, testData} from './day-data';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class AppSrv {

  appState$ = new Subject<AppState>();

  appState: AppState;

  userDayLogs$: FirebaseListObservable<DayData[]>;

  auth: FirebaseAuthState;

  constructor(daysSrv: DaysService, private af: AngularFire) {
    this.af.auth
      .switchMap((auth) => {
        this.auth = auth;
        if (auth) {
          this.userDayLogs$ = this.af.database.list(`DayLogs/${auth.uid}`, {
            query: {
              orderByChild: 'weight'
            }
          });
          return this.userDayLogs$;
        } else {
          return Observable.from([]);
        }
      })
      .map((data: DayData[]) => {
        return data.sort((a, b) => {
          return new Date(a.date).valueOf() - new Date(b.date).valueOf();
        }).reverse();
      })
      .subscribe((data: DayData[]) => {
        console.log(data);
        this.appState = {
          days: daysSrv.makeDaysRows(data),
          stats: {
            calsAverage: 0,
            weightAverage: 0,
            weightChangeAvg: 0,
            calsOffsetAvg: 0
          }
        };
        this.calcAverages();
      });

    // Observable.interval(500).take(1).subscribe((d) => {
    // });
  }

  testPushData() {
    if (this.userDayLogs$) {
      // testData.forEach(d => this.userDayLogs$.push(d));
    }
    // testItems.push(testData);
  }


  dispatchChange() {
    this.appState$.next(this.appState);
  }

  addDay() {
    let lastDay = this.appState.days[this.appState.days.length - 1];
    let date  = new Date(lastDay.date);
    date.setDate(date.getDate() - 1);
    // this.appState.days = [...days, ];

    this.userDayLogs$.push({
      date: new Date(date).toISOString(),
      cals: lastDay.cals,
      weight: lastDay.weight,
      isNew: true
    });
    // this.calcAverages();
  }

  updateDay(newDay: DayData) {

    if (newDay.$key) {
      this.userDayLogs$.update(newDay.$key, {weight: newDay.weight});
    } else {
      this.userDayLogs$.push(newDay);
    }



    // const index = this.appState.days.findIndex(day => day.date === newDay.date);
    // this.appState.days[index].cals = newDay.cals;
    // this.appState.days[index].weight = newDay.weight;
    // this.calcAverages();
  }

  calcAverages() {

    const addReducer = (prev, curr, i, arr) => prev + curr;
    const avg = (arr: number[] = []) => arr.reduce(addReducer, 0) / arr.length;

    const weights = this.appState.days.map(day => day.weight);
    const changes: number[] = [];

    weights.reverse().forEach((value, i, arr) => {
      if (i !== 0) {
        changes.push(value - arr[i - 1]);
      }
    });

    // const offsets = changes.map((val, i, arr) => val * 3500);

    // console.log('changes', changes);
    // console.log('offsets', offsets);

    this.appState.stats.weightChangeAvg = avg(changes);
    this.appState.stats.calsOffsetAvg = this.appState.stats.weightChangeAvg * 3500;
    this.appState.stats.weightAverage = avg(weights);
    this.appState.stats.calsAverage = avg(this.appState.days.map(day => day.cals));

    this.dispatchChange();
  }


}
