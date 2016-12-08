/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppSrv } from './app.service';

describe('DaysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSrv]
    });
  });

  it('should ...', inject([AppSrv], (service: AppSrv) => {
    expect(service).toBeTruthy();
  }));
});
