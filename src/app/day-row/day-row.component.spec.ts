/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DayRowComponent } from './day-row.component';



describe('DayRowComponent', () => {
  let component: DayRowComponent;
  let fixture: ComponentFixture<DayRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayRowComponent ],
      imports: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayRowComponent);
    component = fixture.componentInstance;
    component.data = {date: new Date(), weight: 0, cals: 0, isNew: true};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
