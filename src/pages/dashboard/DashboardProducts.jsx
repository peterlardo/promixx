import { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { categories, formatPrice } from '../../data/mockData.js'

const emptyForm = {
  name: '', reference: '', category: 'Supermarchés', categoryId: 1,
  brand: '', description: '', price: 0, promoPrice: 0,
  stock: 0, available: true, endDate: '',
}

export default function DashboardProducts() {
  const { products, addProduct, updateProduct, deleteProduct, shops } = useApp()
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.shopName.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (product) => {
    setForm({
      name: product.name, reference: product.reference,
      category: product.category, categoryId: product.categoryId,
      brand: product.brand, description: product.description,
      price: product.price, promoPrice: product.promoPrice,
      stock: product.stock, available: product.available,
      endDate: product.endDate || '',
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Supprimer "${name}" ?`)) {
      deleteProduct(id)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const discount = form.price > 0 ? Math.round((1 - form.promoPrice / form.price) * 100) : 0
    const shop = shops[0]
    const productData = {
      ...form, discount,
      shopId: shop.id, shopName: shop.name, shopCity: shop.city,
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop',
      rating: 0, reviews: 0,
    }
    if (editingId) {
      updateProduct(editingId, productData)
    } else {
      addProduct(productData)
    }
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="dash-header">
        <div>
          <h1>📦 Produits</h1>
          <p className="text-muted">Gérez votre catalogue de produits ({products.length} produits)</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true) }}>
          + Nouveau produit
        </button>
      </div>

      <div className="dash-toolbar">
        <input
          type="text" placeholder="Rechercher un produit..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="dash-search"
        />
        <select className="dash-select" defaultValue="">
          <option value="">Toutes les catégories</option>
          {categories.map(c => <option key={c.id}>{c.name}</option>)}
        </select>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Modifier le produit' : 'Nouveau produit'}</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nom du produit</label>
                    <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Référence</label>
                    <input className="form-input" value={form.reference} onChange={e => setForm({ ...form, reference: e.target.value })} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Catégorie</label>
                    <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                      {categories.map(c => <option key={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Marque</label>
                    <input className="form-input" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Prix normal (FCFA)</label>
                    <input type="number" className="form-input" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Prix promotionnel (FCFA)</label>
                    <input type="number" className="form-input" value={form.promoPrice} onChange={e => setForm({ ...form, promoPrice: Number(e.target.value) })} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Stock</label>
                    <input type="number" className="form-input" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date fin promotion</label>
                    <input type="date" className="form-input" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-checkbox">
                    <input type="checkbox" checked={form.available} onChange={e => setForm({ ...form, available: e.target.checked })} />
                    <span>Produit disponible</span>
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Mettre à jour' : 'Créer le produit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="dash-table-card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Réf.</th>
                <th>Boutique</th>
                <th>Prix</th>
                <th>Promo</th>
                <th>Réduction</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong></td>
                  <td className="text-muted">{p.reference}</td>
                  <td>{p.shopName}</td>
                  <td>{formatPrice(p.price)}</td>
                  <td style={{ color: 'var(--success)', fontWeight: 600 }}>{formatPrice(p.promoPrice)}</td>
                  <td><span className="badge badge-active">-{p.discount}%</span></td>
                  <td>
                    <span className={p.stock < 10 ? 'text-danger' : ''}>
                      {p.stock} {p.stock < 10 && '⚠️'}
                    </span>
                  </td>
                  <td>
                    <div className="dash-actions">
                      <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(p)}>✏️</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id, p.name)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: 32, color: 'var(--text-secondary)' }}>Aucun produit trouvé</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
