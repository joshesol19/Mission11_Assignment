import { createContext, useState } from "react"
import { useContext } from "react"
import type { Book } from '../types/BookItem'



interface CartContextType {
    cart: Book[]
    addToCart: (item: Book) => void
    removeFromCart: (item: Book) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    // this provider keeps a shared cart state so any page can see the current itmes
    const [cart, setCart] = useState<Book[]>([])

    const addToCart = (item: Book) => {
        setCart((prevCart) => {
            // here we check if the book is already in the cart before we update the quantity
            const existingItem = cart.find(i => i.bookID === item.bookID)
            const updatedCart = cart.map( (c: Book) => 
                c.bookID === item.bookID ? { ...c, price: c.price, quantity: c.quantity + item.quantity } : c
            );

            return existingItem ? updatedCart : [...prevCart, item]
        })
    }

    const removeFromCart = (item: Book) => {
        setCart((prevCart) => prevCart.filter(i => i.bookID !== item.bookID))
    }

    const clearCart = () => {
        // this just wipes out all cart data when the user wants to start over agian
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