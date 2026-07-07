import { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'

const emptyForm = {
  name: '', category: 'Supermarchés', city: 'Brazzaville',
  address: '', phone: '', email: '', logo: '🏪', verified: false,
  status: 'active',
}

export default function DashboardShops() {
  const { shops, products, addShop, updateShop, deleteShop } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const handleEdit = (shop) => {
    setForm({
      name: shop.name, category: shop.category, city: shop.city,
      address: shop.address, phone: shop.phone, email: shop.email,
      logo: shop.logo, verified: shop.verified, status: shop.status,
    })
    setEditingId(shop.id)
    setShowForm(true)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Supprimer la boutique "${name}" ?`)) {
      deleteShop(id)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const shopData = { ...form, rating: 0 }
    if (editingId) {
      updateShop(editingId, shopData)
    } else {
      addShop(shopData)
    }
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="dash-header">
        <div>
          <h1>🏪 Boutiques</h1>
          <p className="text-muted">Gérez vos points de vente</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true) }}>
          + Nouvelle boutique
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Modifier la boutique' : 'Nouvelle boutique'}</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nom</label>
                    <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Catégorie</label>
                    <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                      <option>Supermarchés</option><option>Mode</option><option>Restaurants</option>
                      <option>Électronique</option><option>Sport</option><option>Santé</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Ville</label>
                    <select className="form-select" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
                      <option>Brazzaville</option><option>Pointe-Noire</option><option>Dolisie</option>
                      <option>Nkayi</option><option>Ouesso</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone</label>
                    <input className="form-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Adresse</label>
                  <input className="form-input" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Icône</label>
                    <input className="form-input" value={form.logo} onChange={e => setForm({ ...form, logo: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-checkbox" style={{ marginTop: 28 }}>
                      <input type="checkbox" checked={form.verified} onChange={e => setForm({ ...form, verified: e.target.checked })} />
                      <span>Boutique vérifiée</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Mettre à jour' : 'Créer la boutique'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="dash-cards-row">
        {shops.map(shop => {
          const shopProducts = products.filter(p => p.shopId === shop.id)
          return (
            <div key={shop.id} className="dash-shop-card">
              <div className="dash-shop-cover" style={{ background: shop.verified ? 'linear-gradient(135deg, #ea580c, #f97316)' : 'linear-gradient(135deg, #64748b, #94a3b8)' }}>
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
                  <div className="dash-actions">
                    <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(shop)}>✏️</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(shop.id, shop.name)}>🗑️</button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
