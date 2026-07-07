import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">P</span>
              <span className="logo-text">PROMIXX</span>
            </div>
            <p>Toutes les promotions au même endroit. Découvrez les meilleures offres près de chez vous au Congo.</p>
            <div className="footer-social">
              <span>📘</span>
              <span>📷</span>
              <span>🐦</span>
              <span>▶️</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Plateforme</h4>
            <Link to="/shops">Boutiques</Link>
            <Link to="/products">Promotions</Link>
            <Link to="/">Catégories</Link>
            <Link to="/">Offres Flash</Link>
          </div>
          <div className="footer-col">
            <h4>Commerçants</h4>
            <Link to="/register">Créer un compte</Link>
            <Link to="/dashboard">Espace Pro</Link>
            <Link to="/">Publicité</Link>
            <Link to="/">Abonnements</Link>
          </div>
          <div className="footer-col">
            <h4>À propos</h4>
            <Link to="/">Qui sommes-nous</Link>
            <Link to="/">Contact</Link>
            <Link to="/">CGU</Link>
            <Link to="/">Confidentialité</Link>
          </div>
          <div className="footer-col footer-apps">
            <h4>Téléchargez l'application</h4>
            <div className="app-badges">
              <span className="app-badge">📱 App Store</span>
              <span className="app-badge">📱 Google Play</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 PROMIXX. Tous droits réservés. République du Congo.</p>
        </div>
      </div>
    </footer>
  )
}
