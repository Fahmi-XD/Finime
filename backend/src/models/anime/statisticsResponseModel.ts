export interface IStatisticsStandarResponse {
  watching?:      number;
  completed?:     number;
  on_hold?:       number;
  dropped?:       number;
  plan_to_watch?: number;
  total?:         number;
  scores?:        any[];
}
