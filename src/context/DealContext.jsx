import { createContext, useContext, useState, useCallback } from 'react'
import { shops as initialShops, deals as initialDeals } from '../data/mockData.js'

const DealContext = createContext(null)

export function DealProvider({ children }) {
  const [shops, setShops] = useState(initialShops)
  const [deals, setDeals] = useState(initialDeals)

  const addDeal = useCallback((deal) => {
    const newDeal = {
      ...deal,
      id: Math.max(...deals.map(d => d.id), 0) + 1,
      spent: 0,
    }
    setDeals(prev => [...prev, newDeal])
    return newDeal
  }, [deals])

  const updateDeal = useCallback((id, updates) => {
    setDeals(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d))
  }, [])

  const deleteDeal = useCallback((id) => {
    setDeals(prev => prev.filter(d => d.id !== id))
  }, [])

  const getDealById = useCallback((id) => {
    return deals.find(d => d.id === id) || null
  }, [deals])

  const getShopsByStatus = useCallback((status) => {
    if (!status) return shops
    return shops.filter(s => s.status === status)
  }, [shops])

  const stats = {
    totalShops: shops.length,
    activeShops: shops.filter(s => s.status === 'active').length,
    totalDeals: deals.length,
    activeDeals: deals.filter(d => d.status === 'active').length,
    totalBudget: deals.reduce((sum, d) => sum + d.budget, 0),
    totalSpent: deals.reduce((sum, d) => sum + d.spent, 0),
    draftDeals: deals.filter(d => d.status === 'draft').length,
  }

  return (
    <DealContext.Provider value={{
      shops, deals, stats,
      addDeal, updateDeal, deleteDeal,
      getDealById, getShopsByStatus,
    }}>
      {children}
    </DealContext.Provider>
  )
}

export function useDeals() {
  const ctx = useContext(DealContext)
  if (!ctx) throw new Error('useDeals must be used within DealProvider')
  return ctx
}
