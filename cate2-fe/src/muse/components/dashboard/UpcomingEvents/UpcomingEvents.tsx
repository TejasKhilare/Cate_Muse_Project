import { Calendar, MapPin } from 'lucide-react';
import { useUpcomingEvents } from '@/muse/hooks/dashboard/useDashboard';
import styles from './UpcomingEvents.module.css';

export const UpcomingEvents = () => {
  const { data: events = [] } = useUpcomingEvents();

  return (
    <div className={styles.wrapper}>
      {events.map((event) => (
        <div key={event.id} className={styles.eventCard}>
          <div className={styles.eventName}>{event.name}</div>
          <div className={styles.eventMeta}>
            <span className={styles.metaItem}>
              <Calendar size={12} />
              {event.date}
            </span>
            <span className={styles.metaItem}>
              <MapPin size={12} />
              {event.venue}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};