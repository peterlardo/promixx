import { getDealsByShop } from '../data/mockData.js'

export default function ShopCard({ shop }) {
  const shopDeals = getDealsByShop(shop.id)
  const activeDeals = shopDeals.filter(d => d.status === 'active').length

  return (
    <div className="shop-card">
      <div className="shop-logo">{shop.logo}</div>
      <div className="shop-info" style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <h3>{shop.name}</h3>
          <span className={`badge badge-${shop.status}`}>{shop.status}</span>
        </div>
        <p>{shop.category} • {shop.email}</p>
        <p style={{ marginTop: 4 }}>
          <strong>{shopDeals.length}</strong> deals ({activeDeals} active)
        </p>
      </div>
    </div>
  )
}
