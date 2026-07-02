import { Link } from 'react-router-dom'
import './App.css'
import logo from './assets/hero.png'

function App() {
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
  )
}

export default App
