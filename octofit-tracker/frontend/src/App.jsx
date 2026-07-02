import { Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import logo from './assets/hero.png';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

function HomePage() {
  return (
    <main className="app-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Octofit Tracker</p>
          <h1>Stay consistent. Compete with your crew.</h1>
          <p className="lead">
            Log workouts, follow your progress, and keep your fitness goals moving
            forward with a friendly team experience.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" to="/dashboard">
              Open dashboard
            </Link>
            <Link className="btn btn-outline-secondary btn-lg" to="/teams">
              View teams
            </Link>
          </div>
        </div>
        <div className="hero-card">
          <img src={logo} alt="Octofit tracker illustration" className="hero-image" />
          <div className="card-body">
            <h2>Today&apos;s focus</h2>
            <ul className="feature-list">
              <li>Track workouts in seconds</li>
              <li>Celebrate streaks and milestones</li>
              <li>Motivate teammates with friendly challenges</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

function DashboardPage() {
  return (
    <section className="container py-4">
      <h2 className="mb-4">Dashboard</h2>
      <p className="text-muted">
        Explore the live fitness data backed by the Octofit API.
      </p>
      <div className="row g-3">
        {[
          { to: '/users', title: 'Users', text: 'Meet the athletes in the tracker.' },
          { to: '/teams', title: 'Teams', text: 'See the groups driving the challenges.' },
          { to: '/activities', title: 'Activities', text: 'Review recent training sessions.' },
          { to: '/leaderboard', title: 'Leaderboard', text: 'Watch the scores climb.' },
          { to: '/workouts', title: 'Workouts', text: 'Browse suggested sessions.' },
        ].map((item) => (
          <div className="col-md-6 col-lg-4" key={item.to}>
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">{item.title}</h3>
                <p className="card-text">{item.text}</p>
                <Link className="btn btn-outline-primary" to={item.to}>
                  Open section
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Octofit Tracker
          </Link>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink className="nav-link" to="/teams">
              Teams
            </NavLink>
            <NavLink className="nav-link" to="/leaderboard">
              Leaderboard
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
