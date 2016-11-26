import { Component } from '@angular/core';
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
export class AppComponent {
  days: DayData[] = dayData;
}
