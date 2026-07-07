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
            <p className="footer-tagline">La qualité au petit prix</p>
            <p>La plateforme n°1 des promotions commerciales en République du Congo. Découvrez chaque jour les meilleures offres des commerces près de chez vous.</p>
            <div className="footer-newsletter">
              <input type="email" placeholder="S'abonner à la newsletter" />
              <button className="footer-sub-btn">→</button>
            </div>
          </div>
          <div className="footer-col">
            <h4>Découvrir</h4>
            <Link to="/">Promotions du jour</Link>
            <Link to="/">Offres flash</Link>
            <Link to="/">Grandes enseignes</Link>
            <Link to="/shops">Boutiques populaires</Link>
            <Link to="/">Catégories</Link>
          </div>
          <div className="footer-col">
            <h4>Commerçants</h4>
            <Link to="/register">Ouvrir une boutique</Link>
            <Link to="/">Tarifs & abonnements</Link>
            <Link to="/">Publicité sponsorisée</Link>
            <Link to="/">Guide vendeur</Link>
            <Link to="/">Centre d'aide</Link>
          </div>
          <div className="footer-col">
            <h4>PROMIXX</h4>
            <Link to="/">À propos</Link>
            <Link to="/">Blog</Link>
            <Link to="/">Presse</Link>
            <Link to="/">Contact</Link>
            <Link to="/">Recrutement</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 PROMIXX — Brazzaville, République du Congo</p>
          <div className="footer-bottom-links">
            <Link to="/">Confidentialité</Link>
            <Link to="/">CGU</Link>
            <Link to="/">Mentions légales</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
