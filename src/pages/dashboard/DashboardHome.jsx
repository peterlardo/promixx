import { useApp } from '../../context/AppContext.jsx'
import { formatPrice } from '../../data/mockData.js'

function BarChart({ data, color = 'var(--primary)' }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div className="chart-bars">
      {data.map((d, i) => (
        <div key={i} className="chart-col" title={`${d.label}: ${d.value}`}>
          <div className="chart-bar" style={{ height: `${(d.value / max) * 100}%`, background: color }} />
          <span className="chart-label">{d.label.slice(0, 3)}</span>
        </div>
      ))}
    </div>
  )
}

export default function DashboardHome() {
  const { shops, products, notifications, messages, stats } = useApp()
  const activeDeals = products.filter(p => p.promoPrice < p.price).length
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)

  const chartData = [
    { label: 'Lun', value: 12 }, { label: 'Mar', value: 19 },
    { label: 'Mer', value: 8 }, { label: 'Jeu', value: 15 },
    { label: 'Ven', value: 22 }, { label: 'Sam', value: 18 },
    { label: 'Dim', value: 10 },
  ]

  const weeklyRevenue = [65, 78, 45, 82, 95, 70, 52]
  const maxRev = Math.max(...weeklyRevenue, 1)
  const revenueData = weeklyRevenue.map((v, i) => ({
    label: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i],
    value: v * 1000,
  }))

  return (
    <div>
      <div className="dash-header">
        <div>
          <h1>Tableau de bord</h1>
          <p className="text-muted">Vue d'ensemble de votre activité</p>
        </div>
        <div className="dash-period">
          <span className="badge badge-active">📅 Cette semaine</span>
        </div>
      </div>

      <div className="dash-stats-grid">
        <div className="dash-stat-card" style={{ borderLeftColor: '#7c3aed' }}>
          <div className="dash-stat-header">
            <span className="dash-stat-icon" style={{ background: '#f5f3ff' }}>🏪</span>
            <span className="dash-stat-change up">+{stats.monthlyGrowth}%</span>
          </div>
          <div className="dash-stat-value">{stats.totalShops}</div>
          <div className="dash-stat-label">Boutiques</div>
        </div>
        <div className="dash-stat-card" style={{ borderLeftColor: '#22c55e' }}>
          <div className="dash-stat-header">
            <span className="dash-stat-icon" style={{ background: '#dcfce7' }}>🏷️</span>
            <span className="dash-stat-change up">+8%</span>
          </div>
          <div className="dash-stat-value">{activeDeals}</div>
          <div className="dash-stat-label">Promotions actives</div>
        </div>
        <div className="dash-stat-card" style={{ borderLeftColor: '#f59e0b' }}>
          <div className="dash-stat-header">
            <span className="dash-stat-icon" style={{ background: '#fef3c7' }}>📦</span>
            <span className="dash-stat-change up">+{stats.productsLowStock}</span>
          </div>
          <div className="dash-stat-value">{stats.totalProducts}</div>
          <div className="dash-stat-label">Produits</div>
        </div>
        <div className="dash-stat-card" style={{ borderLeftColor: '#ef4444' }}>
          <div className="dash-stat-header">
            <span className="dash-stat-icon" style={{ background: '#fef2f2' }}>💰</span>
            <span className="dash-stat-change">+0%</span>
          </div>
          <div className="dash-stat-value">{formatPrice(stats.totalRevenue)}</div>
          <div className="dash-stat-label">Revenus mensuels</div>
        </div>
      </div>

      <div className="dash-charts-row">
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>📈 Vues des promotions</h3>
            <span className="text-muted">Cette semaine</span>
          </div>
          <BarChart data={chartData} color="#7c3aed" />
        </div>
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>💰 Revenus (x1000 FCFA)</h3>
            <span className="text-muted">Cette semaine</span>
          </div>
          <BarChart data={revenueData} color="#22c55e" />
        </div>
      </div>

      <div className="dash-cards-row">
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>🔔 Notifications récentes</h3>
          </div>
          <div className="dash-list">
            {notifications.slice(0, 4).map(n => (
              <div key={n.id} className={`dash-list-item ${!n.read ? 'unread' : ''}`}>
                <div className="dash-list-dot" style={{
                  background: n.type === 'success' ? '#22c55e' : n.type === 'warning' ? '#f59e0b' : '#3b82f6'
                }} />
                <div className="dash-list-content">
                  <p>{n.text}</p>
                  <span className="dash-list-time">{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <h3>💬 Messages récents</h3>
          </div>
          <div className="dash-list">
            {messages.slice(0, 3).map(m => (
              <div key={m.id} className={`dash-list-item ${m.unread ? 'unread' : ''}`}>
                <span className="dash-list-avatar">{m.avatar}</span>
                <div className="dash-list-content">
                  <p><strong>{m.from}</strong> {m.text}</p>
                  <span className="dash-list-time">{m.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dash-card">
        <div className="dash-card-header">
          <h3>📋 Derniers produits</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Boutique</th>
                <th>Prix</th>
                  <th>Promo</th>
                <th>Réduction</th>
                <th>Stock</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 6).map(p => (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.shopName}</td>
                  <td>{formatPrice(p.price)}</td>
                  <td style={{ color: 'var(--success)', fontWeight: 600 }}>{formatPrice(p.promoPrice)}</td>
                  <td><span className="badge badge-active">-{p.discount}%</span></td>
                  <td>{p.stock}</td>
                  <td>{p.available ? <span className="badge badge-active">Actif</span> : <span className="badge badge-draft">Inactif</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
