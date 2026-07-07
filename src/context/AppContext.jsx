import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { shops as initialShops, products as initialProducts, flashDeals as initialFlashDeals } from '../data/mockData.js'

const emptyProduct = {
  shopId: 1, name: '', reference: '', category: 'Supermarchés', categoryId: 1,
  brand: '', description: '', price: 0, promoPrice: 0, discount: 0,
  image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop',
  stock: 0, available: true, rating: 0, reviews: 0,
  shopName: 'GreenLeaf Supermarché', shopCity: 'Brazzaville', endDate: '',
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [shops, setShops] = useState(initialShops)
  const [products, setProducts] = useState(initialProducts)
  const [flashDeals] = useState(initialFlashDeals)
  const [promotions, setPromotions] = useState([])
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Nouvelle promotion créée avec succès', type: 'success', time: 'il y a 2h', read: false },
    { id: 2, text: 'Votre abonnement expire dans 7 jours', type: 'warning', time: 'il y a 1j', read: false },
    { id: 3, text: '3 nouveaux avis clients sur vos produits', type: 'info', time: 'il y a 2j', read: true },
    { id: 4, text: 'La promotion "Summer Grocery" se termine demain', type: 'warning', time: 'il y a 3j', read: true },
  ])
  const [messages, setMessages] = useState([
    { id: 1, from: 'Marie K.', text: 'Bonjour, ce produit est-il disponible ?', time: '10:30', unread: true, avatar: '👩🏾' },
    { id: 2, from: 'Jean M.', text: 'Merci pour la livraison rapide !', time: '09:15', unread: false, avatar: '👨🏾' },
    { id: 3, from: 'Aminata D.', text: 'Est-ce que vous avez d\'autres couleurs ?', time: 'Hier', unread: true, avatar: '👩🏾‍🦱' },
  ])

  const nextProductId = useMemo(() => Math.max(...products.map(p => p.id), 0) + 1, [products])

  const addProduct = useCallback((product) => {
    const newProduct = { ...emptyProduct, ...product, id: nextProductId }
    setProducts(prev => [...prev, newProduct])
    setNotifications(prev => [{
      id: Date.now(), text: `Produit "${newProduct.name}" ajouté avec succès`,
      type: 'success', time: 'À l\'instant', read: false,
    }, ...prev])
    return newProduct
  }, [nextProductId])

  const updateProduct = useCallback((id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
    setNotifications(prev => [{
      id: Date.now(), text: `Produit mis à jour avec succès`,
      type: 'success', time: 'À l\'instant', read: false,
    }, ...prev])
  }, [])

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }, [])

  const addPromotion = useCallback((promo) => {
    setPromotions(prev => [...prev, { ...promo, id: Date.now() }])
    setNotifications(prev => [{
      id: Date.now() + 1, text: `Promotion "${promo.title}" créée avec succès`,
      type: 'success', time: 'À l\'instant', read: false,
    }, ...prev])
  }, [])

  const addShop = useCallback((shop) => {
    setShops(prev => [...prev, { ...shop, id: Date.now() }])
    setNotifications(prev => [{
      id: Date.now() + 2, text: `Boutique "${shop.name}" ajoutée avec succès`,
      type: 'success', time: 'À l\'instant', read: false,
    }, ...prev])
  }, [])

  const updateShop = useCallback((id, updates) => {
    setShops(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  }, [])

  const deleteShop = useCallback((id) => {
    setShops(prev => prev.filter(s => s.id !== id))
  }, [])

  const updateProfile = useCallback((data) => {
    setCurrentUser(prev => prev ? { ...prev, ...data } : prev)
  }, [])

  const markNotifRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const markMsgRead = useCallback((id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, unread: false } : m))
  }, [])

  const toggleFavorite = useCallback((productId) => {
    setFavorites(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    )
  }, [])

  const isFavorite = useCallback((productId) => favorites.includes(productId), [favorites])

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) return prev.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      return [...prev, { ...product, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }, [])

  const stats = useMemo(() => ({
    totalShops: shops.length,
    totalProducts: products.length,
    activeDeals: products.filter(p => p.promoPrice < p.price).length,
    totalCities: [...new Set(shops.map(s => s.city))].length,
    totalRevenue: shops.length * 25000,
    monthlyGrowth: 12.5,
    unreadNotifs: notifications.filter(n => !n.read).length,
    unreadMsgs: messages.filter(m => m.unread).length,
    productsLowStock: products.filter(p => p.stock > 0 && p.stock < 10).length,
  }), [shops, products, notifications, messages])

  return (
    <AppContext.Provider value={{
      shops, products, flashDeals, promotions, favorites, cart, currentUser, stats,
      notifications, messages,
      toggleFavorite, isFavorite, addToCart, removeFromCart, setCurrentUser,
      addProduct, updateProduct, deleteProduct,
      addPromotion, addShop, updateShop, deleteShop, updateProfile,
      markNotifRead, markMsgRead,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}


