import { DaysService } from './days.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DayRowComponent } from './day-row/day-row.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';

import { AppSrv } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    DayRowComponent,
    BottomBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AppSrv, DaysService],
  bootstrap: [AppComponent]
})
export class AppModule { }
