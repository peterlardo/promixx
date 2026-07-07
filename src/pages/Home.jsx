import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { categories, formatPrice } from '../data/mockData.js'

function HeroSection() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (city) params.set('city', city)
    navigate(`/products?${params.toString()}`)
  }

  return (
    <section className="hero">
      <div className="hero-bg">
        <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1440&h=600&fit=crop" alt="" />
      </div>
      <div className="hero-content">
        <div className="hero-top">
          <span className="hero-top-badge">📦 +3 500 promotions actives</span>
          <span className="hero-top-badge">📍 Congo</span>
        </div>
        <h1>Toutes les promotions,<br /><span>au même endroit.</span></h1>
        <p className="hero-subtitle">
          Découvrez chaque jour les meilleures offres des commerces près de chez vous à Brazzaville,
          Pointe-Noire et partout au Congo.
        </p>
        <form className="hero-search" onSubmit={handleSearch}>
          <div className="hero-search-select">
            <span>📍</span>
            <select value={city} onChange={e => setCity(e.target.value)}>
              <option value="">Toutes les villes</option>
              {['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Ouesso'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="hero-search-input">
            <input
              type="text"
              placeholder="Rechercher un produit, une marque, une boutique..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button type="submit" className="hero-search-btn">Rechercher</button>
        </form>
        <div className="hero-tags">
          {['Riz', 'Smartphones', 'Sneakers', 'Wax', 'Restaurants', 'Frigo'].map(tag => (
            <Link key={tag} to={`/products?search=${tag}`} className="hero-tag">{tag}</Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function HeroStats() {
  return (
    <div className="hero-stats">
      <div className="hero-stats-inner">
        <div className="hero-stat-item">
          <span className="hero-stat-icon">📉</span>
          <div className="hero-stat-info">
            <span className="hero-stat-value">−47%</span>
            <span className="hero-stat-label">Moyenne des offres flash</span>
          </div>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat-item">
          <span className="hero-stat-icon">🏷️</span>
          <div className="hero-stat-info">
            <span className="hero-stat-value">3.5K</span>
            <span className="hero-stat-label">Promos</span>
          </div>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat-item">
          <span className="hero-stat-icon">🏪</span>
          <div className="hero-stat-info">
            <span className="hero-stat-value">820</span>
            <span className="hero-stat-label">Boutiques</span>
          </div>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat-item">
          <span className="hero-stat-icon">👥</span>
          <div className="hero-stat-info">
            <span className="hero-stat-value">62K</span>
            <span className="hero-stat-label">Membres</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function TopOffreDuJour() {
  const { products } = useApp()
  const top = products[6]

  return (
    <section className="section top-offre-section">
      <div className="top-offre-card">
        <div className="top-offre-content">
          <span className="top-offre-badge">⭐ Top offre du jour</span>
          <h2>{top.name}</h2>
          <p className="top-offre-desc">{top.description}</p>
          <div className="top-offre-pricing">
            <span className="top-offre-price">{formatPrice(top.promoPrice)}</span>
            <span className="top-offre-original">{formatPrice(top.price)}</span>
            <span className="top-offre-discount">−{top.discount}%</span>
          </div>
          <Link to={`/products/${top.id}`} className="btn btn-primary">Explorer</Link>
        </div>
        <div className="top-offre-image">
          <img src={top.image} alt={top.name} />
        </div>
      </div>
    </section>
  )
}

function CategoryGrid() {
  const catPromoCounts = {
    1: 1240, 2: 892, 3: 412, 4: 356, 5: 289, 6: 174,
    7: 246, 8: 512, 9: 92, 10: 138, 11: 201, 12: 156,
  }

  return (
    <section className="section">
      <div className="section-header">
        <h2>Catégories populaires</h2>
        <span className="section-subtitle-header">Trouvez votre bon plan par univers</span>
        <Link to="/products" className="section-link">Voir tout →</Link>
      </div>
      <div className="categories-grid">
        {categories.map(cat => (
          <Link key={cat.id} to={`/products?category=${cat.slug}`} className="category-card">
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
            <span className="category-count">{catPromoCounts[cat.id] || 0} promos</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function FlashDealsSection() {
  const { flashDeals } = useApp()

  return (
    <section className="section flash-section">
      <div className="section-header">
        <h2>🔥 Offres flash</h2>
        <span className="section-subtitle-header">Ça se termine bientôt !</span>
        <Link to="/products" className="section-link">Voir tout →</Link>
      </div>
      <div className="flash-grid">
        {flashDeals.map(deal => (
          <Link key={deal.id} to={`/products/${deal.productId}`} className="flash-card">
            <div className="flash-img-wrapper">
              <img src={deal.image} alt={deal.title} />
              <span className="flash-badge">−{deal.discount}%</span>
              <span className="flash-type-badge">Flash</span>
            </div>
            <div className="flash-info">
              <p className="flash-brand">{deal.shopName} · {deal.title}</p>
              <h4>{deal.title}</h4>
              <div className="flash-prices">
                <span className="flash-promo">{formatPrice(deal.promoPrice)}</span>
                <span className="flash-original">{formatPrice(deal.originalPrice)}</span>
              </div>
              <div className="flash-footer">
                <span className="flash-shop">📍 Casino Brazza · 1.2 km</span>
                <span className="flash-timer">⏱️ {deal.endsIn}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function PromotionsDuJour() {
  const { products } = useApp()
  const featured = products.slice(0, 8)

  return (
    <section className="section">
      <div className="section-header">
        <h2>Aujourd'hui</h2>
        <span className="section-subtitle-header">Sélectionnées près de vous · Brazzaville</span>
        <Link to="/products" className="section-link">Tout voir →</Link>
      </div>
      <div className="promo-grid">
        {featured.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} className="promo-card">
            <div className="promo-img-wrapper">
              <img src={product.image} alt={product.name} />
              <span className="promo-badge">−{product.discount}%</span>
              {product.discount >= 30 && <span className="promo-flash-badge">Flash</span>}
            </div>
            <div className="promo-info">
              <p className="promo-brand">{product.brand} · {product.category}</p>
              <h4>{product.name}</h4>
              <div className="promo-prices">
                <span className="promo-price">{formatPrice(product.promoPrice)}</span>
                <span className="promo-original">{formatPrice(product.price)}</span>
              </div>
              <div className="promo-footer">
                <span className="promo-shop">📍 {product.shopName}</span>
                <span className="promo-distance">{Math.floor(Math.random() * 5 + 0.5)}.{Math.floor(Math.random() * 9)} km</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function GrandesEnseignes() {
  const { shops } = useApp()
  const featured = shops.filter(s => s.verified).slice(0, 6)

  return (
    <section className="section enseignes-section">
      <div className="section-header">
        <h2>🏬 Grandes enseignes</h2>
        <span className="section-subtitle-header">Boutiques populaires</span>
        <Link to="/shops" className="section-link">Voir tout →</Link>
      </div>
      <div className="enseignes-grid">
        {featured.map(shop => (
          <Link key={shop.id} to={`/shops/${shop.id}`} className="enseigne-card">
            <div className="enseigne-icon">{shop.logo}</div>
            <div className="enseigne-info">
              <h4>{shop.name}</h4>
              <p>{shop.city} · {Math.floor(Math.random() * 40 + 5)} promos actives</p>
            </div>
            <span className="enseigne-arrow">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { icon: '🔍', title: 'Recherchez', desc: 'Trouvez le produit qui vous intéresse par catégorie, marque ou près de chez vous.' },
    { icon: '📊', title: 'Comparez', desc: 'Comparez les prix des commerces locaux et repérez le meilleur bon plan.' },
    { icon: '🛍️', title: 'Achetez', desc: 'Rendez-vous en boutique ou commandez, et profitez de la promo.' },
  ]

  return (
    <section className="section how-it-works">
      <h2>Comment ça marche</h2>
      <p className="section-subtitle">Économisez en 3 étapes</p>
      <div className="steps-grid">
        {steps.map((step, i) => (
          <div key={i} className="step-card">
            <div className="step-number">0{i + 1}</div>
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function MerchantCTA() {
  return (
    <section className="merchant-cta">
      <div className="merchant-cta-inner">
        <div className="merchant-cta-content">
          <h2>Vendez plus. Attirez vos voisins.</h2>
          <p>Publiez vos promotions en quelques minutes, gérez votre catalogue, mesurez vos performances et boostez votre visibilité à Brazzaville, Pointe-Noire et partout au Congo.</p>
          <div className="merchant-stats">
            <div className="merchant-stat">
              <strong>5 min</strong>
              <span>pour publier une promo</span>
            </div>
            <div className="merchant-stat">
              <strong>820+</strong>
              <span>commerces déjà inscrits</span>
            </div>
            <div className="merchant-stat">
              <strong>×3.2</strong>
              <span>de trafic en boutique</span>
            </div>
            <div className="merchant-stat">
              <strong>0 FCFA</strong>
              <span>pour commencer</span>
            </div>
          </div>
          <div className="merchant-cta-actions">
            <Link to="/register" className="btn btn-primary btn-lg">Ouvrir ma boutique</Link>
            <Link to="/" className="btn btn-secondary btn-lg">Voir les tarifs</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrendingSection() {
  const { products } = useApp()
  const trending = products.slice(0, 4)

  return (
    <section className="section">
      <div className="section-header">
        <h2>Tendances</h2>
        <span className="section-subtitle-header">Les plus consultés cette semaine</span>
        <Link to="/products" className="section-link">Voir tout →</Link>
      </div>
      <div className="promo-grid">
        {trending.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} className="promo-card">
            <div className="promo-img-wrapper">
              <img src={product.image} alt={product.name} />
              <span className="promo-badge">−{product.discount}%</span>
              {product.discount >= 30 && <span className="promo-flash-badge">Flash</span>}
            </div>
            <div className="promo-info">
              <p className="promo-brand">{product.brand} · {product.category}</p>
              <h4>{product.name}</h4>
              <div className="promo-prices">
                <span className="promo-price">{formatPrice(product.promoPrice)}</span>
                <span className="promo-original">{formatPrice(product.price)}</span>
              </div>
              <div className="promo-footer">
                <span className="promo-shop">📍 {product.shopName}</span>
                <span className="promo-distance">{Math.floor(Math.random() * 5 + 0.5)}.{Math.floor(Math.random() * 9)} km</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroStats />
      <TopOffreDuJour />
      <CategoryGrid />
      <FlashDealsSection />
      <PromotionsDuJour />
      <GrandesEnseignes />
      <HowItWorks />
      <MerchantCTA />
      <TrendingSection />
    </>
  )
}
