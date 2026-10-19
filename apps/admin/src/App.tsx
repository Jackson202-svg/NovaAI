const stats = [
  { label: 'Monthly revenue', value: '$2.4M', trend: '+18.4%' },
  { label: 'Active users', value: '148K', trend: '+12.1%' },
  { label: 'AI requests', value: '8.9M', trend: '+21.7%' },
  { label: 'Support time saved', value: '34%', trend: '+9.6%' },
];

const cards = [
  { title: 'Users', value: '148,202' },
  { title: 'Pro subscriptions', value: '31,104' },
  { title: 'Enterprise teams', value: '486' },
  { title: 'Churn', value: '2.1%' },
];

export default function App() {
  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="brand">NovaAI Admin</div>
        <nav>
          <a href="#">Overview</a>
          <a href="#">Users</a>
          <a href="#">Subscriptions</a>
          <a href="#">Analytics</a>
          <a href="#">Support</a>
          <a href="#">Moderation</a>
          <a href="#">Settings</a>
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <h1>Operations dashboard</h1>
          <button>Export report</button>
        </header>

        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <em>{stat.trend}</em>
            </div>
          ))}
        </div>

        <div className="panel-grid">
          <section className="panel large">
            <h2>Revenue</h2>
            <div className="chart-bars">
              <span style={{ height: '45%' }} />
              <span style={{ height: '62%' }} />
              <span style={{ height: '58%' }} />
              <span style={{ height: '77%' }} />
              <span style={{ height: '88%' }} />
              <span style={{ height: '95%' }} />
            </div>
          </section>

          <section className="panel">
            <h2>Quick stats</h2>
            {cards.map((card) => (
              <div key={card.title} className="quick-row">
                <span>{card.title}</span>
                <strong>{card.value}</strong>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
