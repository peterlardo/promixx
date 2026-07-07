import { useApp } from '../../context/AppContext.jsx'

export default function DashboardShops() {
  const { shops, products } = useApp()

  return (
    <div>
      <div className="dash-header">
        <div>
          <h1>🏪 Boutiques</h1>
          <p className="text-muted">Gérez vos points de vente</p>
        </div>
      </div>

      <div className="dash-cards-row">
        {shops.map(shop => {
          const shopProducts = products.filter(p => p.shopId === shop.id)
          return (
            <div key={shop.id} className="dash-shop-card">
              <div className="dash-shop-cover" style={{ background: shop.verified ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : 'linear-gradient(135deg, #64748b, #94a3b8)' }}>
                <span className="dash-shop-logo">{shop.logo}</span>
              </div>
              <div className="dash-shop-body">
                <div className="dash-shop-header">
                  <h3>{shop.name}</h3>
                  {shop.verified && <span className="badge badge-active">✅ Vérifié</span>}
                </div>
                <p className="text-muted">{shop.category} • {shop.city}</p>
                <div className="dash-shop-stats">
                  <div className="dash-shop-stat">
                    <strong>{shopProducts.length}</strong>
                    <span>Produits</span>
                  </div>
                  <div className="dash-shop-stat">
                    <strong>{shopProducts.filter(p => p.promoPrice < p.price).length}</strong>
                    <span>Promos</span>
                  </div>
                  <div className="dash-shop-stat">
                    <strong>⭐ {shop.rating}</strong>
                    <span>Avis</span>
                  </div>
                </div>
                <div className="dash-shop-contact">
                  <span>📞 {shop.phone}</span>
                  <span>✉️ {shop.email}</span>
                  <span>📍 {shop.address}</span>
                </div>
                <div className="dash-shop-footer">
                  <span className={`badge ${shop.status === 'active' ? 'badge-active' : 'badge-draft'}`}>
                    {shop.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                  <button className="btn btn-sm btn-secondary">⚙️ Gérer</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
