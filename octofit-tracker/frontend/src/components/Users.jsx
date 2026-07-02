import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('users'));
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.users ?? data.results ?? [];
        setUsers(items);
      } catch (err) {
        setError(err.message);
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="container py-4">
      <h2>Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user._id || user.id || user.email}>
            <strong>{user.name || user.email || 'Unknown user'}</strong>
            {user.email ? <div>{user.email}</div> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
