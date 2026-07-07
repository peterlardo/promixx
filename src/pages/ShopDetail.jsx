import { useParams, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { getShopById, getProductsByShop, formatPrice } from '../data/mockData.js'

export default function ShopDetail() {
  const { id } = useParams()
  const { products } = useApp()
  const shop = getShopById(Number(id))

  if (!shop) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🏪</div>
        <h3>Boutique non trouvée</h3>
        <p>Cette boutique n'existe pas ou a été désactivée.</p>
        <Link to="/shops" className="btn btn-primary" style={{ marginTop: 16 }}>Voir les boutiques</Link>
      </div>
    )
  }

  const shopProducts = getProductsByShop(shop.id)

  return (
    <div>
      <Link to="/shops" className="back-link">← Retour aux boutiques</Link>

      <div className="shop-detail-header">
        <img src={shop.coverImage} alt={shop.name} className="shop-detail-cover" />
        <div className="shop-detail-overlay">
          <div className="shop-detail-info">
            <span className="shop-detail-logo">{shop.logo}</span>
            <div>
              <h1>{shop.name} {shop.verified && '✅'}</h1>
              <p>{shop.category} • {shop.city}</p>
              <div className="shop-detail-rating">⭐ {shop.rating} ({shop.reviews} avis)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="shop-detail-body">
        <div className="shop-detail-main">
          <div className="detail-section">
            <h2>À propos</h2>
            <p>{shop.description}</p>
            <div className="detail-grid" style={{ marginTop: 16 }}>
              <div>
                <div className="detail-field-label">Adresse</div>
                <div className="detail-field-value">📍 {shop.address}</div>
              </div>
              <div>
                <div className="detail-field-label">Téléphone</div>
                <div className="detail-field-value">📞 {shop.phone}</div>
              </div>
              <div>
                <div className="detail-field-label">Email</div>
                <div className="detail-field-value">✉️ {shop.email}</div>
              </div>
              <div>
                <div className="detail-field-label">Membre depuis</div>
                <div className="detail-field-value">📅 {shop.joinedDate}</div>
              </div>
            </div>
            <div className="product-detail-actions" style={{ marginTop: 16 }}>
              <a href={`https://wa.me/${shop.whatsapp?.replace(/\s/g, '')}`}
                target="_blank" className="btn btn-success">💬 WhatsApp</a>
              <a href={`tel:${shop.phone}`} className="btn btn-secondary">📞 Appeler</a>
              <a href={`mailto:${shop.email}`} className="btn btn-secondary">✉️ Email</a>
            </div>
          </div>

          <div className="detail-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Promotions ({shopProducts.length})</h2>
            </div>
            {shopProducts.length > 0 ? (
              <div className="promo-grid" style={{ marginTop: 16 }}>
                {shopProducts.map(product => (
                  <Link key={product.id} to={`/products/${product.id}`} className="promo-card">
                    <span className="promo-badge">-{product.discount}%</span>
                    <img src={product.image} alt={product.name} />
                    <div className="promo-info">
                      <h4>{product.name}</h4>
                      <div className="promo-prices">
                        <span className="promo-original">{formatPrice(product.price)}</span>
                        <span className="promo-price">{formatPrice(product.promoPrice)}</span>
                      </div>
                      <div className="promo-meta">
                        <span>⭐ {product.rating}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Aucune promotion en cours pour cette boutique.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
