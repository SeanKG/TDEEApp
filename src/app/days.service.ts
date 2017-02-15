import { Injectable } from '@angular/core';
import {DayData} from './day-data';

export const dateString = (date: Date) => `${date.getDate()}:${date.getMonth()}:${date.getFullYear()}`;

export const dayString = (day: DayData) => `${day.weight}:
                                            ${day.cals}:
                                            ${dateString(new Date(day.date))}`;

@Injectable()
export class DaysService {

  constructor() {
   }

  // getDaysLogs() {
  // }

  /* 
    Takes data that may have missings days in it and returns data
    with the blanks filled in based on the existing data.
    Covers the current date back to the first logged day.
  */
  makeDaysRows(userData: DayData[]) {
    let rows: DayData[] = [];
    let today = new Date();
    let lastDay: DayData;
    if (!userData || !userData.length) {
      return [{
        weight: null,
        cals: null,
        date: new Date().toISOString()
      }];
    };

    // Loop through the the exsting logs
    userData.forEach(data => {
      // While the current day does not match the next data point,
      // add days based on the last last data point is applicable,
      // otherwise the current one. 
      while (!this.compareDates(today, new Date(data.date))) {
        let newDay: DayData;
        if (!lastDay) { lastDay = data; }
        newDay = {
          weight: lastDay.weight,
          cals: lastDay.cals,
          date: new Date(today).toISOString()
        };
        rows = [...rows, newDay];
        today.setDate(today.getDate() - 1);
      }

      rows = [...rows, data];
      today.setDate(today.getDate() - 1);
      lastDay = data;
    });
    return rows;
  }

  compareDates(date1: Date, date2: Date) {
    if (dateString(date1) === dateString(date2)) { return true; };
    return false;
  }

  compareDays(day1: DayData, day2: DayData) {
    if (dayString(day1) === dayString(day2)) { return true; };
    return false;
  }


}
