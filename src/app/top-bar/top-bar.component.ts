import { EventEmitter } from '@angular/forms/src/facade/async';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @Input() name: string;

  @Output() onLogout = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  logout() {
    this.onLogout.emit();
  }



}
