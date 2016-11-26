import { Component, OnInit, Input } from '@angular/core';

import {DayData} from '../day-data';

@Component({
  selector: 'app-day-row',
  templateUrl: './day-row.component.html',
  styleUrls: ['./day-row.component.css']
})
export class DayRowComponent implements OnInit {
  @Input() data: DayData;

  constructor() { }

  ngOnInit() {
  }


}
