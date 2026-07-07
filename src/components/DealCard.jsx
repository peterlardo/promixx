import { Link } from 'react-router-dom'
import { getStatusColor } from '../data/mockData.js'

export default function DealCard({ deal, shopName }) {
  const spentPct = deal.budget > 0 ? Math.round((deal.spent / deal.budget) * 100) : 0

  return (
    <Link to={`/deals/${deal.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="deal-card">
        <div className="deal-card-header">
          <div>
            <div className="deal-card-title">{deal.title}</div>
            <div className="deal-card-shop">{shopName}</div>
          </div>
          <span className={`badge badge-${deal.status}`}>{deal.status}</span>
        </div>
        <div className="deal-card-desc">{deal.description}</div>
        <div className="deal-card-meta">
          <span className="deal-card-meta-item">
            Discount: <strong>{deal.discount}</strong>
          </span>
          <span className="deal-card-meta-item">
            Budget: <strong>${deal.budget.toLocaleString()}</strong>
          </span>
          <span className="deal-card-meta-item">
            Spent: <strong>${deal.spent.toLocaleString()}</strong>
          </span>
        </div>
        <div className="deal-card-footer">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {deal.startDate} → {deal.endDate}
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: getStatusColor(deal.status) }}>
            {spentPct}% used
          </span>
        </div>
        <div className="budget-bar">
          <div className="budget-bar-fill" style={{ width: `${Math.min(spentPct, 100)}%' }} />
        </div>
      </div>
    </Link>
  )
}
