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

import { AngularFireModule } from 'angularfire2';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';

// Must export the config
export const firebaseConfig = {
    apiKey: 'AIzaSyAS6fyQAl6T9KYSSzqSX1FzMbhXGEHzJG0',
    authDomain: 'tdeeapp.firebaseapp.com',
    databaseURL: 'https://tdeeapp.firebaseio.com',
    storageBucket: 'tdeeapp.appspot.com',
    messagingSenderId: '387424323405'
};

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    DayRowComponent,
    BottomBarComponent,
    SidebarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AppSrv, DaysService],
  bootstrap: [AppComponent]
})
export class AppModule { }
