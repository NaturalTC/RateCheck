import { useEffect, useState } from 'react'
import './App.css'

type Health = { status: string; db: string }

// Starter screen: proves the client can reach the API.
// TODO(you): replace with the estimate form - milestone 3 in docs/PLAN.md.
function App() {
  const [health, setHealth] = useState<Health | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then(setHealth)
      .catch(() => setError('API not reachable - is the server running?'))
  }, [])

  return (
    <main>
      <h1>RateCheck</h1>
      <p>Massachusetts car insurance estimates. An estimate, not a quote.</p>
      {error && <p>{error}</p>}
      {health && <p>API: {health.status} · Database: {health.db}</p>}
    </main>
  )
}

export default App
