import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function Header() {
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { cart, currentUser } = useApp()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <span className="logo-icon">P</span>
          <span className="logo-text">PROMIXX</span>
        </Link>

        <form className="header-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Rechercher une promotion, un produit, une boutique..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>Accueil</NavLink>
          <NavLink to="/shops" onClick={() => setMenuOpen(false)}>Boutiques</NavLink>
          <NavLink to="/products" onClick={() => setMenuOpen(false)}>Promotions</NavLink>
          <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Espace Pro</NavLink>
          {currentUser ? (
            <span className="header-user" onClick={() => setMenuOpen(false)}>
              👤 {currentUser.name}
            </span>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
              Connexion
            </Link>
          )}
        </nav>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
