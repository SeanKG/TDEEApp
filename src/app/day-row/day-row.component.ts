import { Observable } from 'rxjs/Rx';
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';

import {DayData} from '../day-data';

@Component({
  selector: 'app-day-row',
  templateUrl: './day-row.component.html',
  styleUrls: ['./day-row.component.css']
})
export class DayRowComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data: DayData;

  @ViewChild('focusTarget') focusTarget: ElementRef;



  @Output() dataChanged = new EventEmitter();

  private lastWeight: number;
  private lastCals: number;


  constructor() { }

  ngOnInit() {
    this.lastWeight = this.data.weight;
    this.lastCals = this.data.cals;
  }

  ngOnChanges(changeRecord) {
    // console.log(changeRecord);
    this.lastWeight = this.data.weight;
    this.lastCals = this.data.cals;
  }

  onChanges() {
  }

  get iconColor() {
    return this.lastWeight === this.data.weight ? 'green' : 'red';
  }

  save() {
    console.log(this);
    this.dataChanged.emit(this.data);
  }

  ngAfterViewInit() {
    // // viewChild is set after the view has been initialized
    // const el = this.focusTarget.nativeElement;
    // // console.log(this.data);
    // // console.log(el);
    // if (this.data.isNew) {
    //   el.focus();
    //   Observable.interval(500).take(1)
    //     .subscribe(() => {
    //       console.log(this.focusTarget);
    //       el.scrollIntoView();
    //       el.select();
    //     });
    // }
  }




}
