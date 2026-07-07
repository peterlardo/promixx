import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import { formatPrice } from '../../data/mockData.js'

export default function DashboardHome() {
  const { products, currentUser, stats } = useApp()

  const topPromos = products.slice(0, 5).map((p, i) => ({
    ...p,
    views: [382, 634, 594, 593, 687][i],
  }))

  return (
    <div>
      <div className="dash-greeting">
        <p className="dash-greeting-text">Bonjour {currentUser?.name} 👋</p>
        <h1 className="dash-greeting-title">Voici l'activité de votre boutique aujourd'hui.</h1>
      </div>

      <div className="dash-home-layout">
        <div className="dash-home-main">
          <div className="dash-home-header">
            <h2>Vue d'ensemble</h2>
            <Link to="/dashboard/promotions" className="btn btn-primary">
              + Nouvelle promotion
            </Link>
          </div>

          <div className="dash-home-stats">
            <div className="dash-home-stat">
              <div className="dash-home-stat-icon" style={{ background: '#fff7ed' }}>
                <span>👁️</span>
              </div>
              <div className="dash-home-stat-body">
                <div className="dash-home-stat-header">
                  <span className="dash-home-stat-value">12 483</span>
                  <span className="dash-home-stat-change up">+18%</span>
                </div>
                <span className="dash-home-stat-label">Vues (7j)</span>
              </div>
            </div>
            <div className="dash-home-stat">
              <div className="dash-home-stat-icon" style={{ background: '#f0fdf4' }}>
                <span>🖱️</span>
              </div>
              <div className="dash-home-stat-body">
                <div className="dash-home-stat-header">
                  <span className="dash-home-stat-value">3 214</span>
                  <span className="dash-home-stat-change up">+9%</span>
                </div>
                <span className="dash-home-stat-label">Clics</span>
              </div>
            </div>
            <div className="dash-home-stat">
              <div className="dash-home-stat-icon" style={{ background: '#fef2f2' }}>
                <span>❤️</span>
              </div>
              <div className="dash-home-stat-body">
                <div className="dash-home-stat-header">
                  <span className="dash-home-stat-value">482</span>
                  <span className="dash-home-stat-change up">+22%</span>
                </div>
                <span className="dash-home-stat-label">Favoris</span>
              </div>
            </div>
            <div className="dash-home-stat">
              <div className="dash-home-stat-icon" style={{ background: '#eff6ff' }}>
                <span>💰</span>
              </div>
              <div className="dash-home-stat-body">
                <div className="dash-home-stat-header">
                  <span className="dash-home-stat-value">1 284 000 FCFA</span>
                  <span className="dash-home-stat-change up">+31%</span>
                </div>
                <span className="dash-home-stat-label">Revenus estimés</span>
              </div>
            </div>
          </div>

          <div className="dash-home-section">
            <div className="dash-home-section-header">
              <h2>Promotions les plus performantes</h2>
              <span className="dash-home-section-period">Ces 7 derniers jours</span>
              <Link to="/dashboard/promotions" className="dash-home-section-link">Voir tout →</Link>
            </div>
            <div className="dash-top-promos">
              {topPromos.map((p, i) => (
                <div key={p.id} className="dash-top-promo">
                  <span className="dash-top-promo-rank">0{i + 1}</span>
                  <img src={p.image} alt={p.name} className="dash-top-promo-img" />
                  <div className="dash-top-promo-info">
                    <strong>{p.name}</strong>
                    <span>{p.category} · −{p.discount}%</span>
                  </div>
                  <span className="dash-top-promo-price">{formatPrice(p.promoPrice)}</span>
                  <span className="dash-top-promo-views">{p.views} vues</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dash-home-sidebar">
          <div className="dash-home-card">
            <h3>Catalogue</h3>
            <div className="dash-catalog-info">
              <span className="dash-catalog-count">{products.length} produits actifs</span>
              <div className="dash-catalog-bar">
                <div className="dash-catalog-bar-fill" style={{ width: '64%' }} />
              </div>
              <span className="dash-catalog-plan">Plan Pro : {products.length} / 200 ({Math.round((products.length / 200) * 100)}%)</span>
            </div>
          </div>

          <div className="dash-home-card">
            <h3>Promotions actives</h3>
            <div className="dash-active-promos">
              <span className="dash-active-count">{stats.activeDeals}</span>
              <span className="dash-active-detail">dont {Math.min(Math.floor(stats.activeDeals / 3), 4)} offres flash</span>
              <Link to="/dashboard/promotions" className="dash-active-link">
                Gérer les promotions →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
