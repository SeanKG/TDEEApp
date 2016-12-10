import { Observable } from 'rxjs/Rx';
import { Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
  ViewChild
 } from '@angular/core';

import {DayData} from '../day-data';

@Component({
  selector: 'app-day-row',
  templateUrl: './day-row.component.html',
  styleUrls: ['./day-row.component.css']
})
export class DayRowComponent implements OnInit, AfterViewInit {
  @Input() data: DayData;

  @ViewChild('focusTarget') focusTarget: ElementRef;



  @Output() dataChanged = new EventEmitter();


  constructor() { }

  ngOnInit() {
    // console.log(arguments);
  }

  onChanges() {
    this.dataChanged.emit(this.data);
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    const el = this.focusTarget.nativeElement;
    if (this.data.isNew) {
      el.focus();
      Observable.interval(500).take(1)
        .subscribe(() => {
          console.log(this.focusTarget);
          el.scrollIntoView();
          el.select();
        });
    }
  }




}
