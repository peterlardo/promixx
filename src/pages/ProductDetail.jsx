import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { getProductById, getShopById, formatPrice } from '../data/mockData.js'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, addToCart, toggleFavorite, isFavorite } = useApp()
  const product = getProductById(Number(id))
  const shop = product ? getShopById(product.shopId) : null
  const similar = products.filter(p => p.categoryId === product?.categoryId && p.id !== product?.id).slice(0, 4)

  if (!product) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <h3>Produit non trouvé</h3>
        <p>Ce produit n'existe pas ou a été retiré.</p>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: 16 }}>Voir les promotions</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/products" className="back-link">← Retour aux promotions</Link>

      <div className="product-detail">
        <div className="product-detail-gallery">
          <img src={product.image} alt={product.name} className="product-detail-main-img" />
        </div>
        <div className="product-detail-info">
          <span className="promo-badge" style={{ position: 'static', display: 'inline-block', marginBottom: 12 }}>
            -{product.discount}%
          </span>
          <h1>{product.name}</h1>
          <Link to={`/shops/${shop?.id}`} className="product-detail-shop">
            {shop?.logo} {product.shopName} • {product.shopCity}
          </Link>

          <div className="product-detail-pricing">
            <span className="product-detail-promo-price">{formatPrice(product.promoPrice)}</span>
            <span className="product-detail-original-price">{formatPrice(product.price)}</span>
            <span className="product-detail-save">Économisez {formatPrice(product.price - product.promoPrice)}</span>
          </div>

          <div className="product-detail-meta">
            <span>⭐ {product.rating} ({product.reviews} avis)</span>
            <span>📦 {product.stock} en stock</span>
            <span>🏷️ {product.brand}</span>
            <span>🔖 Réf: {product.reference}</span>
          </div>

          <p className="product-detail-desc">{product.description}</p>


          <div className="product-detail-actions">
            <Link to={`https://wa.me/${shop?.whatsapp?.replace(/\s/g, '')}?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20${encodeURIComponent(product.name)}`}
              target="_blank" className="btn btn-success">
              💬 WhatsApp
            </Link>
            <a href={`tel:${shop?.phone}`} className="btn btn-secondary">
              📞 Appeler
            </a>
          </div>

          <div className="product-detail-terms">
            <h4>📍 Localisation</h4>
            <p>{shop?.address}, {shop?.city}</p>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="section" style={{ marginTop: 48 }}>
          <div className="section-header">
            <h2>Produits similaires</h2>
          </div>
          <div className="promo-grid">
            {similar.map(p => (
              <Link key={p.id} to={`/products/${p.id}`} className="promo-card">
                <span className="promo-badge">-{p.discount}%</span>
                <img src={p.image} alt={p.name} />
                <div className="promo-info">
                  <h4>{p.name}</h4>
                  <p className="promo-shop">{p.shopName}</p>
                  <div className="promo-prices">
                    <span className="promo-original">{formatPrice(p.price)}</span>
                    <span className="promo-price">{formatPrice(p.promoPrice)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
