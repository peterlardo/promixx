import { useState } from 'react'
import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'

const sidebarLinks = [
  { to: '/dashboard', end: true, icon: '📊', label: 'Tableau de bord' },
  { to: '/dashboard/products', icon: '📦', label: 'Produits' },
  { to: '/dashboard/promotions', icon: '🏷️', label: 'Promotions' },
  { to: '/dashboard/shops', icon: '🏪', label: 'Boutiques' },
  { to: '/dashboard/settings', icon: '⚙️', label: 'Paramètres' },
]

export default function DashboardLayout() {
  const { currentUser, stats, notifications, messages } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="dashboard-layout">
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-user">
          <div className="sidebar-avatar">👤</div>
          <div>
            <div className="sidebar-name">{currentUser.name}</div>
            <div className="sidebar-role">Commerçant</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {sidebarLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
              {link.to === '/dashboard/products' && stats.productsLowStock > 0 && (
                <span className="sidebar-badge">{stats.productsLowStock}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-notif-row">
            <span>🔔</span>
            <span>Notifications</span>
            {stats.unreadNotifs > 0 && <span className="sidebar-badge danger">{stats.unreadNotifs}</span>}
          </div>
          <div className="sidebar-notif-row">
            <span>💬</span>
            <span>Messages</span>
            {stats.unreadMsgs > 0 && <span className="sidebar-badge danger">{stats.unreadMsgs}</span>}
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <div className="dashboard-content">
        <div className="dashboard-topbar">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <div className="topbar-right">
            <span className="topbar-icon" title="Messages">💬 {stats.unreadMsgs > 0 && <span className="badge-dot" />}</span>
            <span className="topbar-icon" title="Notifications">🔔 {stats.unreadNotifs > 0 && <span className="badge-dot" />}</span>
            <span className="topbar-user">👤 {currentUser.name}</span>
          </div>
        </div>
        <div className="dashboard-body">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
