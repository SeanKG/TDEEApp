import { DayData } from './day-data';

export interface ChangeStats {
    calsAverage?: number;
    weightAverage?: number;
    weightChangeAvg?: number;
    calsOffsetAvg?: number;
}

export interface AppState {
  stats?: ChangeStats;
  days?: DayData[];
}

