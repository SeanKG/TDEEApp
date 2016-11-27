import { Component, OnChanges, OnInit } from '@angular/core';
import {DayData} from './day-data';


const createDate = (dayAdjust: number): Date => {
  const date = new Date();

  date.setDate(date.getDate() + dayAdjust);

  return date;

};




const dayData: DayData[] = [
  { weight: 191.2,
    cals: 1750,
    date: createDate(0)
  },
  { weight: 189.4,
    cals: 1750,
    date: createDate(-1)
  },
  { weight: 189.9,
    cals: 1750,
    date: createDate(-2)
  },
  { weight: 191.6,
    cals: 1750,
    date: createDate(-3)
  },
  { weight: 190.7,
    cals: 1750,
    date: createDate(-4)
  },
  { weight: 194.3,
    cals: 1750,
    date: createDate(-5)
  },
  { weight: 191.6,
    cals: 1750,
    date: createDate(-6)
  },
  { weight: 192.6,
    cals: 1750,
    date: createDate(-7)
  },
  { weight: 193.5,
    cals: 1750,
    date: createDate(-8)
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
  weightChangeAvg: number;
  calsOffsetAvg: number;

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


  addDay() {
    console.log('adding day');
    let lastDay = this.days[this.days.length - 1];
    let{date}  = lastDay;
    date.setDate(date.getDate() - 1);
    this.days.push({
      date: new Date(date),
      cals: lastDay.cals,
      weight: lastDay.weight,
      isNew: true
    });
    this.calcAverages();
  }

  calcAverages() {

    const addReducer = (prev, curr, i, arr) => prev + curr;
    const avg = (arr: number[] = []) => arr.reduce(addReducer) / arr.length;

    const weights = this.days.map(day => day.weight);
    const changes: number[] = [];

    weights.reverse().forEach((value, i, arr) => {
      if (i !== 0) {
        changes.push(value - arr[i - 1]);
      }
    });

    const offsets = changes.map((val, i, arr) => val * 3500);

    console.log('changes', changes);
    console.log('offsets', offsets);

    this.weightChangeAvg = avg(changes);
    this.calsOffsetAvg = this.weightChangeAvg * 3500;
    this.weightAverage = avg(weights);
    this.calsAverage = avg(this.days.map(day => day.cals));

    // this.weightChangeAvg = weights.reverse().reduce((prev, curr, i, arr) => {
    //   if (i === 0) {
    //     return 0;
    //   }
    //   let lastItem = arr[i - 1],
    //       change = curr - lastItem;

    //       return (prev + change) / 2;

    // }, 1);

  }

  updateDay(newDay: DayData) {
    const index = this.days.findIndex(day => day.date === newDay.date);
    this.days[index].cals = newDay.cals;
    this.days[index].weight = newDay.weight;
    this.calcAverages();
  }

}
