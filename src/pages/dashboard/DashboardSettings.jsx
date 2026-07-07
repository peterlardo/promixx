import { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'

export default function DashboardSettings() {
  const { currentUser } = useApp()
  const [profile, setProfile] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '+242 05 123 4567',
    shopName: 'GreenLeaf Supermarché',
    shopCategory: 'Supermarchés',
    shopCity: 'Brazzaville',
    shopAddress: '123 Avenue de l\'Indépendance',
  })
  const [saved, setSaved] = useState(false)
  const [sub, setSub] = useState({
    plan: 'Pro',
    status: 'active',
    renews: '15 août 2025',
    price: '25 000 FCFA/mois',
  })

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <div className="dash-header">
        <div>
          <h1>⚙️ Paramètres</h1>
          <p className="text-muted">Gérez votre profil et vos préférences</p>
        </div>
      </div>

      <div className="dash-settings-grid">
        <div className="dash-card">
          <h3>👤 Profil commerçant</h3>
          <form onSubmit={handleSave} style={{ marginTop: 16 }}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Nom</label>
                <input className="form-input" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Téléphone</label>
              <input className="form-input" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
            </div>
            <h3 style={{ marginTop: 24 }}>🏪 Informations boutique</h3>
            <div className="form-row" style={{ marginTop: 16 }}>
              <div className="form-group">
                <label className="form-label">Nom de la boutique</label>
                <input className="form-input" value={profile.shopName} onChange={e => setProfile({ ...profile, shopName: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Catégorie</label>
                <select className="form-select" value={profile.shopCategory} onChange={e => setProfile({ ...profile, shopCategory: e.target.value })}>
                  <option>Supermarchés</option>
                  <option>Mode</option>
                  <option>Restaurants</option>
                  <option>Électronique</option>
                  <option>Sport</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Ville</label>
                <select className="form-select" value={profile.shopCity} onChange={e => setProfile({ ...profile, shopCity: e.target.value })}>
                  <option>Brazzaville</option>
                  <option>Pointe-Noire</option>
                  <option>Dolisie</option>
                  <option>Nkayi</option>
                  <option>Ouesso</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Adresse</label>
                <input className="form-input" value={profile.shopAddress} onChange={e => setProfile({ ...profile, shopAddress: e.target.value })} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
              💾 Enregistrer
            </button>
            {saved && <span className="alert-success" style={{ display: 'inline-block', marginLeft: 12, padding: '8px 16px' }}>✅ Modifications enregistrées</span>}
          </form>
        </div>

        <div>
          <div className="dash-card" style={{ marginBottom: 20 }}>
            <h3>📋 Abonnement</h3>
            <div className="dash-subscription">
              <div className="dash-sub-plan">
                <span className="dash-sub-badge">{sub.plan}</span>
                <span className={`badge ${sub.status === 'active' ? 'badge-active' : 'badge-draft'}`}>
                  {sub.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </div>
              <div className="dash-sub-details">
                <div className="detail-field-label">Formule</div>
                <div className="detail-field-value">{sub.plan} - {sub.price}</div>
                <div className="detail-field-label" style={{ marginTop: 8 }}>Prochain renouvellement</div>
                <div className="detail-field-value">{sub.renews}</div>
              </div>
              <button className="btn btn-secondary" style={{ width: '100%', marginTop: 12 }}>📈 Changer de formule</button>
            </div>
          </div>

          <div className="dash-card">
            <h3>🔔 Préférences</h3>
            <div style={{ marginTop: 16 }}>
              {[
                { label: 'Notifications email', checked: true },
                { label: 'Notifications SMS', checked: false },
                { label: 'Rappels de fin de promotion', checked: true },
                { label: 'Nouveaux avis clients', checked: true },
                { label: 'Rapport hebdomadaire', checked: false },
              ].map((pref, i) => (
                <label key={i} className="dash-pref-item">
                  <input type="checkbox" defaultChecked={pref.checked} />
                  <span>{pref.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
