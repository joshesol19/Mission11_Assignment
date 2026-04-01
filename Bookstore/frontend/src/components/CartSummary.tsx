import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// this cart summary shows a tiny badge with how much is in the cart
const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  {/* #notcoveredinthevideos: Uses Bootstrap badge + fixed positioning utilities for a more visible cart summary. */}
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // clicking on this area will navigate the user over to the cart screen
  return (
    <div
      role="button"
      tabIndex={0}
      className="position-fixed top-0 end-0 m-3 d-flex align-items-center gap-2 bg-light border rounded shadow-sm px-3 py-2"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate('/cart')}
    >
      <span>🛒</span>
      <span>Cart</span>
      <span className="badge rounded-pill text-bg-primary">{itemCount}</span>
      <strong className="ms-1">${totalAmount.toFixed(2)}</strong>
    </div>
  );
};

export default CartSummary;