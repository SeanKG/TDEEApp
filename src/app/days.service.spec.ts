/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { dateString, DaysService } from './days.service';
import { createDate, DayData } from './day-data';

describe('DaysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaysService]
    });
  });

  it('should ...', inject([DaysService], (service: DaysService) => {
    expect(service).toBeTruthy();
  }));


  it('Should compare dates', inject([DaysService], (service: DaysService) => {
    expect(service).toBeTruthy();
    let date1 = new Date(),
        date2 = new Date();

        expect(service.compareDates(date1, date2)).toBeTruthy();
  }));

  it('Should fill in the blanks', inject([DaysService], (service: DaysService) => {
    let userData: DayData[]  = [
      { weight: 191.2,
        cals: 1750,
        date: createDate(-1)
      },
      { weight: 189.4,
        cals: 1750,
        date: createDate(-2)
      },
      { weight: 189.9,
        cals: 1750,
        date: createDate(-5)
      }
    ];

    let expectedData: DayData[]  = [
      { weight: null,
        cals: null,
        date: createDate(0)
      },
      { weight: 191.2,
        cals: 1750,
        date: createDate(-1)
      },
      { weight: 189.4,
        cals: 1750,
        date: createDate(-2)
      },
      { weight: 189.4,
        cals: 1750,
        date: createDate(-3)
      },
      { weight: 189.4,
        cals: 1750,
        date: createDate(-4)
      },
      { weight: 189.9,
        cals: 1750,
        date: createDate(-5)
      }
    ];

    let actualData = service.makeDaysRows(userData);

    expectedData.forEach((expected, i) => {
      let actual = actualData[i];
      expect(expected.weight).toBe(actual.weight);
      expect(expected.cals).toBe(actual.cals);
      expect(dateString(expected.date)).toBe(dateString(actual.date));
    });

  }));




});
