import { Injectable } from '@angular/core';
import {DayData, testData} from './day-data';

import * as Rx from 'rxjs/Rx';


export interface AppState {
  calsAverage?: number;
  weightAverage?: number;
  weightChangeAvg?: number;
  calsOffsetAvg?: number;
  days?: DayData[];

}

@Injectable()
export class AppSrv {

  appState$ = new Rx.Subject<AppState>();

  appState: AppState = {
    calsAverage: 0,
    weightAverage: 0,
    weightChangeAvg: 0,
    calsOffsetAvg: 0,
    days: []
  };

  constructor() {
    this.appState.days = testData;
  }

  start() {
    // this.dispatchChange();
    this.calcAverages();
  }

  dispatchChange() {
    this.appState$.next(this.appState);
  }

  addDay() {
    console.log('adding day');
    let lastDay = this.appState.days[this.appState.days.length - 1];
    let{date}  = lastDay,
      {days} = this.appState;
    date.setDate(date.getDate() - 1);
    this.appState.days = [...days, {
      date: new Date(date),
      cals: lastDay.cals,
      weight: lastDay.weight,
      isNew: true
    }];
    this.calcAverages();
  }

  updateDay(newDay: DayData) {
    const index = this.appState.days.findIndex(day => day.date === newDay.date);
    // let { date, cals, weight } = newDay;
    this.appState.days[index].cals = newDay.cals;
    this.appState.days[index].weight = newDay.weight;
    // this.appState.days[index] = {
    //   date: new Date(date),
    //   cals,
    //   weight
    // };
    this.calcAverages();
  }

  calcAverages() {

    const addReducer = (prev, curr, i, arr) => prev + curr;
    const avg = (arr: number[] = []) => arr.reduce(addReducer) / arr.length;

    const weights = this.appState.days.map(day => day.weight);
    const changes: number[] = [];

    weights.reverse().forEach((value, i, arr) => {
      if (i !== 0) {
        changes.push(value - arr[i - 1]);
      }
    });

    const offsets = changes.map((val, i, arr) => val * 3500);

    console.log('changes', changes);
    console.log('offsets', offsets);

    this.appState.weightChangeAvg = avg(changes);
    this.appState.calsOffsetAvg = this.appState.weightChangeAvg * 3500;
    this.appState.weightAverage = avg(weights);
    this.appState.calsAverage = avg(this.appState.days.map(day => day.cals));

    this.dispatchChange();
  }


}
