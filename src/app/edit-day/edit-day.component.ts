import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-day',
  templateUrl: './edit-day.component.html',
  styleUrls: ['./edit-day.component.scss']
})
export class EditDayComponent implements OnInit {

  @Input() calories: number;
  @Input() weight: number;

  @Output() onSave = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.onSave.emit({calories: this.calories, weight: this.weight});
  }

}
