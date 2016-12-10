import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangeStats } from '../types';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {

  @Output() onAddDay = new EventEmitter();

  @Input() stats: ChangeStats;

  constructor() { }

  ngOnInit() {
  }

  // ngOnChanges() {
  //   debugger;
  // }

  @Output() addDay() {
    this.onAddDay.emit();
  }


}
