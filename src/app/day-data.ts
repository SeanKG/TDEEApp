export class DayData {
    date: Date;
    cals?: number;
    weight?: number;
    isNew?: boolean = false;
}

export const createDate = (dayAdjust: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + dayAdjust);
  return date;
};

export const testData: DayData[] = [
  { weight: 191.2,
    cals: 1750,
    date: createDate(0 - 1)
  },
  { weight: 189.4,
    cals: 1750,
    date: createDate(-1 - 1)
  },
  { weight: 189.9,
    cals: 1750,
    date: createDate(-2 - 1)
  },
  { weight: 191.6,
    cals: 1750,
    date: createDate(-3 - 1)
  },
  { weight: 190.7,
    cals: 1750,
    date: createDate(-4 - 1)
  },
  { weight: 194.3,
    cals: 1750,
    date: createDate(-5 - 1)
  },
  // { weight: 191.6,
  //   cals: 1750,
  //   date: createDate(-6 - 1)
  // },
  { weight: 192.6,
    cals: 1750,
    date: createDate(-7 - 1)
  },
  { weight: 193.5,
    cals: 1750,
    date: createDate(-8 - 1)
  }
];
