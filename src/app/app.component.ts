import { Component, OnChanges, OnInit } from '@angular/core';
import {DayData} from './day-data';


const dayData: DayData[] = [
  {
    date: 25,
    cals: 1765,
    weight: 191.2
  },
  {
    date: 24,
    cals: 1757,
    weight: 192.1
  },
  {
    date: 23,
    cals: 1753,
    weight: 191.7
  },
  {
    date: 22,
    cals: 1776,
    weight: 192.8
  }

];



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, OnInit {
  days: DayData[] = dayData;

  calsAverage: number;
  weightAverage: number;



  ngOnInit() {
    this.calcAverages();
  }

  ngOnChanges() {
    this.calcAverages();
  }

  calcAverages() {
    this.weightAverage = this.days.map(day => day.weight)
                                  .reduce((prev, curr, i) => prev + curr) / this.days.length;

    this.calsAverage = this.days.map(day => day.cals)
                                  .reduce((prev, curr, i) => prev + curr) / this.days.length;


  }

  updateDay(newDay: DayData) {
    const index = this.days.findIndex(day => day.date === newDay.date);

    this.days[index].cals = newDay.cals;
    this.days[index].weight = newDay.weight;

    this.calcAverages();
  }



}
