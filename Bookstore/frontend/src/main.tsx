import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.tsx'
import CategoryFilter from './categoryFilter.tsx'
import WelcomeBanner from './welcomeBanner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <WelcomeBanner />
        </div>
        <div className="col-md-3">
          <CategoryFilter />
        </div>
        <div className="col-md-9">
          <App />
        </div>
      </div>
    </div>
  </StrictMode>,
)
