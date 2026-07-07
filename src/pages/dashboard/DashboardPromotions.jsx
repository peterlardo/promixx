import { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { formatPrice } from '../../data/mockData.js'

const promoTypes = [
  { value: 'flash', label: '🔥 Offre Flash' },
  { value: 'clearance', label: '📦 Déstockage' },
  { value: 'liquidation', label: '🏷️ Liquidation' },
  { value: 'seasonal', label: '🌿 Promotion saisonnière' },
  { value: 'limited', label: '⏳ Offre limitée' },
  { value: 'bundle', label: '🎁 Pack promotionnel' },
]

const emptyForm = {
  title: '', productId: '', type: 'flash', discount: 0,
  startDate: '', endDate: '', startTime: '', priority: 'normal',
  budget: 0, description: '',
}

export default function DashboardPromotions() {
  const { products, promotions, addPromotion } = useApp()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const promoProducts = [...products.filter(p => p.promoPrice < p.price), ...promotions]

  const filtered = promoProducts.filter(p => {
    const name = p.name || p.title || ''
    const shop = p.shopName || ''
    if (search && !name.toLowerCase().includes(search.toLowerCase()) && !shop.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const product = products.find(p => p.id === Number(form.productId))
    addPromotion({
      ...form,
      productId: Number(form.productId),
      name: product?.name || form.title,
      shopName: product?.shopName || '',
      discount: form.discount || product?.discount || 0,
      price: product?.price || 0,
      promoPrice: product?.promoPrice || 0,
      image: product?.image || 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop',
    })
    setForm(emptyForm)
    setShowForm(false)
  }

  return (
    <div>
      <div className="dash-header">
        <div>
          <h1>🏷️ Promotions</h1>
          <p className="text-muted">Créez et gérez vos campagnes promotionnelles</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Nouvelle promotion
        </button>
      </div>

      <div className="dash-toolbar">
        <input type="text" placeholder="Rechercher une promotion..." className="dash-search"
          value={search} onChange={e => setSearch(e.target.value)} />
        <select className="dash-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Tous les statuts</option>
          <option value="active">Actives</option>
          <option value="scheduled">Planifiées</option>
          <option value="expired">Expirées</option>
        </select>
        <select className="dash-select">
          <option value="">Type de promotion</option>
          {promoTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🚀 Créer une promotion</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Titre de la promotion</label>
                  <input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Ex: Soldes d'été" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Produit concerné</label>
                    <select className="form-select" value={form.productId} onChange={e => setForm({ ...form, productId: e.target.value })} required>
                      <option value="">Sélectionner un produit</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.name} - {formatPrice(p.price)}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Type de promotion</label>
                    <select className="form-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                      {promoTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Réduction (%)</label>
                    <input type="number" className="form-input" value={form.discount} onChange={e => setForm({ ...form, discount: Number(e.target.value) })} min={0} max={100} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Budget (FCFA)</label>
                    <input type="number" className="form-input" value={form.budget} onChange={e => setForm({ ...form, budget: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Date de début</label>
                    <input type="date" className="form-input" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date de fin</label>
                    <input type="date" className="form-input" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Heure de début</label>
                    <input type="time" className="form-input" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Priorité</label>
                    <select className="form-select" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                      <option value="low">Basse</option>
                      <option value="normal">Normale</option>
                      <option value="high">Haute</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description de votre promotion..." />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary">🚀 Lancer la promotion</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="dash-promos-grid">
        {filtered.map(p => (
          <div key={p.id} className="dash-promo-card">
            <div className="dash-promo-header">
              <span className="promo-badge" style={{ position: 'static' }}>-{p.discount}%</span>
              <span className={`badge badge-active`}>Active</span>
            </div>
            <h4>{p.name || p.title}</h4>
            <p className="text-muted" style={{ fontSize: '0.8rem' }}>{p.shopName || ''}</p>
            {p.price ? (
              <div className="dash-promo-prices">
                <span className="promo-original">{formatPrice(p.price)}</span>
                <span className="promo-price">{formatPrice(p.promoPrice)}</span>
              </div>
            ) : p.budget ? (
              <div className="dash-promo-prices">
                <span className="promo-price">Budget: {formatPrice(p.budget)}</span>
              </div>
            ) : null}
            <div className="dash-promo-meta">
              {p.startDate && <span>Du {p.startDate}</span>}
              {p.endDate && <span>au {p.endDate}</span>}
              {p.type && <span>• {p.type}</span>}
            </div>
            <div className="dash-promo-actions">
              <button className="btn btn-sm btn-secondary">✏️</button>
              <button className="btn btn-sm btn-secondary">⏸️</button>
              <button className="btn btn-sm btn-danger">🗑️</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="empty-state-icon">🏷️</div>
            <h3>Aucune promotion</h3>
            <p>Créez votre première promotion pour attirer plus de clients.</p>
          </div>
        )}
      </div>
    </div>
  )
}
