import BookPage from './pages/BookPage'
import AddToCartPage from './pages/AddToCartPage'
import CartPage from './pages/CartPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ShopProvider } from './context/ShopContext'

function App() {

  return (
    <>
    <ShopProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookPage />} />
            <Route path="/add-to-cart/:bookId" element={<AddToCartPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </ShopProvider>
    </>
  )
}

export default App
