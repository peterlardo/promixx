import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { categories, testimonials, stats, formatPrice } from '../data/mockData.js'

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
      <div className="hero-bg" />
      <div className="hero-content">
        <h1>Toutes les promotions<br /><span>au même endroit</span></h1>
        <p className="hero-subtitle">
          Découvrez les meilleures offres des commerces près de chez vous au Congo.
          Économisez sur vos achats quotidiens !
        </p>
        <form className="hero-search" onSubmit={handleSearch}>
          <div className="hero-search-input">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Que cherchez-vous ? (produit, boutique...)"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="hero-search-select">
            <span>📍</span>
            <select value={city} onChange={e => setCity(e.target.value)}>
              <option value="">Toutes les villes</option>
              {['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Nkayi', 'Ouesso'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">Rechercher</button>
        </form>
        <div className="hero-tags">
          {categories.slice(0, 6).map(cat => (
            <Link key={cat.id} to={`/products?category=${cat.slug}`} className="hero-tag">
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryGrid() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Catégories</h2>
        <Link to="/products" className="section-link">Voir tout →</Link>
      </div>
      <div className="categories-grid">
        {categories.map(cat => (
          <Link key={cat.id} to={`/products?category=${cat.slug}`} className="category-card" style={{ '--cat-color': cat.color }}>
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
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
        <h2>🔥 Offres Flash</h2>
        <Link to="/products" className="section-link">Voir tout →</Link>
      </div>
      <div className="flash-grid">
        {flashDeals.map(deal => (
          <Link key={deal.id} to={`/products/${deal.productId}`} className="flash-card">
            <span className="flash-badge">-{deal.discount}%</span>
            <img src={deal.image} alt={deal.title} />
            <div className="flash-info">
              <h4>{deal.title}</h4>
              <p className="flash-shop">{deal.shopName}</p>
              <div className="flash-prices">
                <span className="flash-original">{formatPrice(deal.originalPrice)}</span>
                <span className="flash-promo">{formatPrice(deal.promoPrice)}</span>
              </div>
              <div className="flash-timer">⏱️ {deal.endsIn}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function FeaturedPromotions() {
  const { products } = useApp()
  const featured = products.slice(0, 6)

  return (
    <section className="section">
      <div className="section-header">
        <h2>⭐ Promotions du jour</h2>
        <Link to="/products" className="section-link">Voir tout →</Link>
      </div>
      <div className="promo-grid">
        {featured.map(product => (
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
      </div>
    </section>
  )
}

function FeaturedShops() {
  const { shops } = useApp()
  const featured = shops.filter(s => s.verified).slice(0, 4)

  return (
    <section className="section">
      <div className="section-header">
        <h2>🏪 Boutiques populaires</h2>
        <Link to="/shops" className="section-link">Voir tout →</Link>
      </div>
      <div className="shops-grid-home">
        {featured.map(shop => (
          <Link key={shop.id} to={`/shops/${shop.id}`} className="shop-card-home">
            <img src={shop.coverImage} alt={shop.name} className="shop-cover" />
            <div className="shop-card-body">
              <div className="shop-logo-small">{shop.logo}</div>
              <h4>{shop.name}</h4>
              <p>{shop.category} • {shop.city}</p>
              <div className="shop-rating">⭐ {shop.rating} ({shop.reviews})</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { icon: '🔍', title: 'Recherchez', desc: 'Trouvez les promotions qui vous intéressent par catégorie, ville ou boutique.' },
    { icon: '💾', title: 'Économisez', desc: 'Profitez des meilleurs prix et économisez sur vos achats du quotidien.' },
    { icon: '📍', title: 'Localisez', desc: 'Repérez les boutiques près de chez vous et obtenez l\'itinéraire.' },
  ]

  return (
    <section className="section how-it-works">
      <h2>Comment fonctionne PROMIXX ?</h2>
      <p className="section-subtitle">En trois étapes simples, commencez à économiser</p>
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

function TestimonialsSection() {
  return (
    <section className="section testimonials-section">
      <h2>Ce que disent nos utilisateurs</h2>
      <p className="section-subtitle">Rejoignez la communauté PROMIXX</p>
      <div className="testimonials-grid">
        {testimonials.map(t => (
          <div key={t.id} className="testimonial-card">
            <div className="testimonial-stars">{'⭐'.repeat(t.rating)}</div>
            <p className="testimonial-text">"{t.text}"</p>
            <div className="testimonial-author">
              <span className="testimonial-avatar">{t.avatar}</span>
              <div>
                <strong>{t.name}</strong>
                <span>{t.role} • {t.city}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="stats-section-home">
      <div className="stats-inner">
        {[
          { value: stats.boutiques + '+', label: 'Boutiques partenaires' },
          { value: stats.promotions + '+', label: 'Promotions actives' },
          { value: stats.utilisateurs + '+', label: 'Utilisateurs' },
          { value: stats.villes, label: 'Villes couvertes' },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-number">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <section className="newsletter-section">
      <div className="newsletter-inner">
        <h2>Restez informé des meilleures promotions</h2>
        <p>Recevez chaque semaine les meilleures offres près de chez vous</p>
        {subscribed ? (
          <div className="alert alert-success">✅ Merci de votre inscription !</div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">S'abonner</button>
          </form>
        )}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FlashDealsSection />
      <FeaturedPromotions />
      <FeaturedShops />
      <HowItWorks />
      <StatsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  )
}
