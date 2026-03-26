import { useNavigate } from 'react-router-dom'
import WelcomeBanner from '../components/welcomeBanner'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { cart, clearCart, removeFromCart } = useCart()
  const navigate = useNavigate()

  const handleClearCart = () => {
    clearCart()
    navigate('/cart')
  }

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <WelcomeBanner />
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <h1>Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.bookID}>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td><button type="button" className="btn btn-outline-danger" onClick={() => removeFromCart(item)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="d-flex flex-wrap align-items-center gap-4 mt-3">
          <button type="button" className="btn btn-danger" onClick={handleClearCart}>
            Clear Cart
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Back to Books
          </button>
        </div>
      </div>
    </>
  )
}

export default CartPage
