import { Results } from '../interfaces/results.interface';

export class WeatherDto {
  data: {
    by?: string;
    valid_key?: boolean;
    results?: Results;
    execution_time?: number;
    from_cache?: boolean;
  };
}
