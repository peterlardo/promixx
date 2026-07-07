import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import './index.css'

const link = document.createElement('link')
link.rel = 'icon'
link.type = 'image/png'
link.href = import.meta.env.BASE_URL + 'logo.png'
document.head.appendChild(link)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
