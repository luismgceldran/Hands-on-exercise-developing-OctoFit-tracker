import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('teams'));
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.teams ?? data.results ?? [];
        setTeams(items);
      } catch (err) {
        setError(err.message);
      }
    }

    loadTeams();
  }, []);

  return (
    <section className="container py-4">
      <h2>Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team._id || team.id || team.name}>
            <strong>{team.name || 'Unnamed team'}</strong>
            {team.sport ? <div>{team.sport}</div> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
