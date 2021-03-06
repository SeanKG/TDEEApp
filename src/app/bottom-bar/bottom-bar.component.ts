import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {

  @Output() onAddDay = new EventEmitter();

  @Input() calsAverage: number;
  @Input() calsOffsetAvg: number;
  @Input() weightChangeAvg: number;

  constructor() { }

  ngOnInit() {
  }

  @Output() addDay() {
    this.onAddDay.emit();
  }


}
