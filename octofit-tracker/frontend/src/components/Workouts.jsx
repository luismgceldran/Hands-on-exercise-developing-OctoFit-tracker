import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl('workouts'));
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.workouts ?? data.results ?? [];
        setWorkouts(items);
      } catch (err) {
        setError(err.message);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section className="container py-4">
      <h2>Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout._id || workout.id || workout.name}>
            <strong>{workout.name || 'Workout'}</strong>
            {workout.description ? <div>{workout.description}</div> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
