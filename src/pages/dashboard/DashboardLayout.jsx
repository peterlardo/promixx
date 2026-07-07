import { useState } from 'react'
import { NavLink, Outlet, Navigate, Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'

const sidebarLinks = [
  { to: '/dashboard', end: true, icon: '📊', label: 'Tableau de bord' },
  { to: '/dashboard/products', icon: '📦', label: 'Produits' },
  { to: '/dashboard/promotions', icon: '🏷️', label: 'Promotions' },
  { to: '/dashboard/shops', icon: '🏪', label: 'Boutique' },
  { to: '/dashboard/statistiques', icon: '📈', label: 'Statistiques' },
  { to: '/dashboard/avis', icon: '⭐', label: 'Avis clients' },
  { to: '/dashboard/messages', icon: '💬', label: 'Messages' },
  { to: '/dashboard/paiements', icon: '💳', label: 'Paiements' },
  { to: '/dashboard/settings', icon: '⚙️', label: 'Paramètres' },
]

export default function DashboardLayout() {
  const { currentUser, stats } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="dash-layout">
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="dash-sidebar-logo">
          <Link to="/dashboard" className="dash-logo-link">
            <img src={import.meta.env.BASE_URL + 'logo.png'} alt="PROMIXX" className="logo-icon" />
            <span className="logo-text">PROMIXX</span>
          </Link>
          <span className="dash-sidebar-label">Espace pro</span>
        </div>

        <nav className="dash-sidebar-nav">
          {sidebarLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `dash-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="dash-nav-icon">{link.icon}</span>
              <span className="dash-nav-label">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="dash-sidebar-bottom">
          <div className="dash-pro-card">
            <div className="dash-pro-icon">⭐</div>
            <div className="dash-pro-info">
              <strong>Passez Pro</strong>
              <span>Promos illimitées, boost et badge vérifié.</span>
            </div>
            <Link to="/" className="dash-pro-btn">Voir les offres</Link>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="dash-overlay" onClick={() => setSidebarOpen(false)} />}

      <div className="dash-main">
        <div className="dash-topbar">
          <button className="dash-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <div className="dash-shop-info">
            <strong>TechCongo</strong>
            <span>Brazzaville</span>
          </div>
          <div className="dash-topbar-right">
            <Link to="/" className="dash-back-link">← Retour au site</Link>
            <div className="dash-user-avatar">
              <span className="dash-avatar-text">
                {currentUser.name?.charAt(0).toUpperCase() || 'U'}
              </span>
              <div className="dash-user-details">
                <span className="dash-user-name">{currentUser.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dash-body">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
