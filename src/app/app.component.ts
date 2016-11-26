import { Component, OnChanges, OnInit } from '@angular/core';
import {DayData} from './day-data';


const createDate = (dayAdjust: number): Date => {
  const date = new Date();

  date.setDate(date.getDate() + dayAdjust);

  return date;

};

const dayData: DayData[] = [
  {
    date: createDate(0),
    cals: 1765,
    weight: 191.2
  },
  {
    date: createDate(-1),
    cals: 1757,
    weight: 192.1
  },
  {
    date: createDate(-2),
    cals: 1757,
    weight: 192.1
  },
  {
    date: createDate(-3),
    cals: 1757,
    weight: 192.1
  },
  // {
  //   date: 23,
  //   cals: 1753,
  //   weight: 191.7
  // },
  // {
  //   date: 22,
  //   cals: 1776,
  //   weight: 192.8
  // }

];



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, OnInit {
  days: DayData[] = dayData;

  // averageCals: number;
  // averageWeight: number;


  avgDay: DayData;

  // nextDateToAdd: Date;


  ngOnInit() {

    // const lowestDate = this.days.reduce((prev, curr, i) => prev.date > curr.date ? prev : curr).date;

    // lowestDate.setDate(lowestDate.getDate() - 1);
    // this.nextDateToAdd = lowestDate;


    this.calcAverages();
  }

  ngOnChanges() {
    this.calcAverages();
  }


  calcTDEE() {
        let day = this.days.reduceRight((prev, curr, i, arr) => {
      if (i === 0) {
        curr.weightAvg = curr.weight;
        curr.calsAvg = curr.cals;
        return curr;
      }

      curr.weightAvg = curr.weight + prev.weightAvg / 2;
      curr.calsAvg = curr.cals + prev.calsAvg / 2;

      console.log(curr);

      return curr;

    });

    this.avgDay = day;



  }


  addDay() {
    console.log('adding day');
    let{date}  = this.days[this.days.length - 1],
        {avgDay} = this;
    date.setDate(date.getDate() - 1);
    this.days.push({date: new Date(date), cals: avgDay.calsAvg, weight: avgDay.weightAvg});
    this.calcAverages();
  }

  calcAverages() {

  }

  updateDay(newDay: DayData) {
    const index = this.days.findIndex(day => day.date === newDay.date);

    this.days[index].cals = newDay.cals;
    this.days[index].weight = newDay.weight;

    this.calcAverages();
  }




}
