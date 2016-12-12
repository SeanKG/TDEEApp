import { DaysService } from './days.service';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppSrv } from './app.service';

describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSrv, DaysService]
    });
  });

  it('should ...', inject([AppSrv], (service: AppSrv) => {
    expect(service).toBeTruthy();
  }));
});
