// import { FirebaseAuthState } from 'angularfire2/auth';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  @Input() isOpen: boolean;

  // @Input() auth: FirebaseAuthState;

  @Output() onClose = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.onClose.emit();
  }

}
