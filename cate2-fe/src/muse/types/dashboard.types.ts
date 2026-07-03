export interface DashboardKpiStat {
  id:      string;
  label:   string;
  value:   string;
  subtext: string;
  icon:    'proposals' | 'clock' | 'chart' | 'dollar';
  trend:   'up' | 'down' | 'neutral';
}

export interface UpcomingEvent {
  id:    string;
  name:  string;
  date:  string;
  venue: string;
}