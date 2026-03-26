import { createContext, useState } from "react"
import { useContext } from "react"
import type { CartItem } from '../types/CartItem'



interface CartContextType {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (item: CartItem) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([])

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = cart.find(i => i.bookID === item.bookID)
            const updatedCart = cart.map( (c: CartItem) => 
                c.bookID === item.bookID ? { ...c, price: c.price, quantity: c.quantity + item.quantity } : c
            );

            return existingItem ? updatedCart : [...prevCart, item]
        })
    }

    const removeFromCart = (item: CartItem) => {
        setCart((prevCart) => prevCart.filter(i => i.bookID !== item.bookID))
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context;
}