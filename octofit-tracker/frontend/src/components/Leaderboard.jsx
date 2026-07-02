import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.leaderboard ?? data.results ?? [];
        setEntries(items);
      } catch (err) {
        setError(err.message);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="container py-4">
      <h2>Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li className="list-group-item" key={entry._id || entry.id || entry.rank}>
            <strong>{entry.user?.name || 'Unknown user'}</strong> — Score: {entry.score ?? 'n/a'}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Leaderboard;
