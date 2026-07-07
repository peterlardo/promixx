import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setCurrentUser } = useApp()

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (Object.values(form).some(v => !v)) {
      setError('Veuillez remplir tous les champs.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    setCurrentUser({ name: form.name, email: form.email, role: 'commercant' })
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <img src={import.meta.env.BASE_URL + 'logo.png'} alt="PROMIXX" className="logo-icon" />
            <span className="logo-text">PROMIXX</span>
          </div>
          <h1>Créer un compte</h1>
          <p>Rejoignez PROMIXX en tant que commerçant</p>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nom du commerce</label>
              <input type="text" className="form-input" placeholder="Votre boutique"
                value={form.name} onChange={update('name')} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" placeholder="vous@exemple.com"
                value={form.email} onChange={update('email')} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Téléphone</label>
            <input type="tel" className="form-input" placeholder="+242 XX XXX XXXX"
              value={form.phone} onChange={update('phone')} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input type="password" className="form-input" placeholder="••••••••"
                value={form.password} onChange={update('password')} />
            </div>
            <div className="form-group">
              <label className="form-label">Confirmer</label>
              <input type="password" className="form-input" placeholder="••••••••"
                value={form.confirmPassword} onChange={update('confirmPassword')} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Créer mon compte
          </button>
        </form>
        <p className="auth-footer">
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
