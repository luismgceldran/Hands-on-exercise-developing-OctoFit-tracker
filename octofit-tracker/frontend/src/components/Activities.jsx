import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('activities'));
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.activities ?? data.results ?? [];
        setActivities(items);
      } catch (err) {
        setError(err.message);
      }
    }

    loadActivities();
  }, []);

  return (
    <section className="container py-4">
      <h2>Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity._id || activity.id || activity.note}>
            <strong>{activity.type || 'Activity'}</strong>
            {activity.note ? <div>{activity.note}</div> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
