import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { categories } from '../data/mockData.js'

export default function Shops() {
  const { shops } = useApp()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')

  const filtered = shops.filter(shop => {
    if (search && !shop.name.toLowerCase().includes(search.toLowerCase()) &&
        !shop.description.toLowerCase().includes(search.toLowerCase())) return false
    if (categoryFilter && shop.category !== categoryFilter) return false
    if (cityFilter && shop.city !== cityFilter) return false
    return true
  })

  const cities = [...new Set(shops.map(s => s.city))]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">🏪 Boutiques partenaires</h1>
        <span className="text-muted">{filtered.length} boutique{filtered.length > 1 ? 's' : ''}</span>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Rechercher une boutique..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="">Toutes les catégories</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
        </select>
        <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
          <option value="">Toutes les villes</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="shops-list">
        {filtered.map(shop => (
          <Link key={shop.id} to={`/shops/${shop.id}`} className="shop-card-wide">
            <img src={shop.coverImage} alt={shop.name} className="shop-wide-cover" />
            <div className="shop-wide-body">
              <div className="shop-wide-header">
                <span className="shop-wide-logo">{shop.logo}</span>
                <div>
                  <h3>{shop.name} {shop.verified && '✅'}</h3>
                  <p>{shop.category} • {shop.city}</p>
                </div>
                <span className="shop-wide-rating">⭐ {shop.rating}</span>
              </div>
              <p className="shop-wide-desc">{shop.description}</p>
              <div className="shop-wide-meta">
                <span>📍 {shop.address}</span>
                <span>📞 {shop.phone}</span>
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🏪</div>
            <h3>Aucune boutique trouvée</h3>
            <p>Essayez de modifier vos filtres de recherche.</p>
          </div>
        )}
      </div>
    </div>
  )
}
