import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { categories, formatPrice } from '../data/mockData.js'

export default function Products() {
  const { products } = useApp()
  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const initialCategory = searchParams.get('category') || ''
  const initialCity = searchParams.get('city') || ''

  const [search, setSearch] = useState(initialSearch)
  const [categoryFilter, setCategoryFilter] = useState(initialCategory)
  const [cityFilter, setCityFilter] = useState(initialCity)
  const [sortBy, setSortBy] = useState('default')

  const filtered = useMemo(() => {
    let result = [...products]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shopName.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      )
    }
    if (categoryFilter) {
      result = result.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase())
    }
    if (cityFilter) {
      result = result.filter(p => p.shopCity === cityFilter)
    }

    switch (sortBy) {
      case 'discount': result.sort((a, b) => b.discount - a.discount); break
      case 'price-asc': result.sort((a, b) => a.promoPrice - b.promoPrice); break
      case 'price-desc': result.sort((a, b) => b.promoPrice - a.promoPrice); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
    }

    return result
  }, [products, search, categoryFilter, cityFilter, sortBy])

  const cities = [...new Set(products.map(p => p.shopCity))]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">🏷️ Promotions</h1>
        <span className="text-muted">{filtered.length} promotion{filtered.length > 1 ? 's' : ''}</span>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Rechercher un produit..."
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
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Trier par</option>
          <option value="discount">Meilleure réduction</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="rating">Meilleurs avis</option>
        </select>
      </div>

      <div className="promo-grid">
        {filtered.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} className="promo-card">
            <span className="promo-badge">-{product.discount}%</span>
            <img src={product.image} alt={product.name} />
            <div className="promo-info">
              <h4>{product.name}</h4>
              <p className="promo-shop">{product.shopName}</p>
              <div className="promo-prices">
                <span className="promo-original">{formatPrice(product.price)}</span>
                <span className="promo-price">{formatPrice(product.promoPrice)}</span>
              </div>
              <div className="promo-meta">
                <span>⭐ {product.rating}</span>
                <span>📍 {product.shopCity}</span>
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="empty-state-icon">🏷️</div>
            <h3>Aucune promotion trouvée</h3>
            <p>Essayez de modifier vos filtres de recherche.</p>
          </div>
        )}
      </div>
    </div>
  )
}
