import BookPage from './pages/BookPage'
import AddToCartPage from './pages/AddToCartPage'
import CartPage from './pages/CartPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ShopProvider } from './context/ShopContext'
import AdminBooksPage from './pages/AdminBooksPage'

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
            <Route path="/admin" element={<AdminBooksPage selectedCategories={[]} />} />
          </Routes>
        </Router>
      </CartProvider>
    </ShopProvider>
    </>
  )
}

export default App
