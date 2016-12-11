import { Injectable } from '@angular/core';
import {DayData, testData} from './day-data';

export const dateString = (date: Date) => `${date.getDate()}:${date.getMonth()}:${date.getFullYear()}`;

export const dayString = (day: DayData) => `${day.weight}:
                                            ${day.cals}:
                                            ${dateString(day.date)}`;



@Injectable()
export class DaysService {

  constructor() { }

  getDaysLogs() {
  }

  makeDaysRows(userData: DayData[]) {
    let rows: DayData[] = [];
    let today = new Date();
    let lastDay: DayData;
    if (!userData.length) { return []; };
    userData.forEach(data => {
      while (!this.compareDates(today, data.date)) {
        let newDay: DayData;
        if (!lastDay) { lastDay = data; }
        newDay = {
          weight: lastDay.weight,
          cals: lastDay.cals,
          date: new Date(today)
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
