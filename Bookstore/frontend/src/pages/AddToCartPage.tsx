import { useEffect, useState } from "react";
import WelcomeBanner from "../components/welcomeBanner";
import { useNavigate, useParams } from 'react-router-dom'
import './AddToCartPage.css'
import { useCart } from "../context/CartContext"
import type { CartItem } from "../types/CartItem"

type Book = {
    bookID: number
    title: string
    author: string
    publisher: string
    isbn: string
    classification: string
    category: string
    pageCount: number
    price: number
}

function AddToCartPage() {
    const navigate = useNavigate()
    const { bookId } = useParams()
    const [book, setBook] = useState<Book | null>(null)
    const { addToCart } = useCart()

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID: book?.bookID ?? 0,
            title: book?.title ?? '',
            price: book?.price ?? 0,
            quantity: 1
        }
        addToCart(newItem)
        navigate('/cart')
    }

    useEffect(() => {
        const fetchBook = async () => {
            const res = await fetch(`https://localhost:7263/api/Books/${bookId}`)
            const data = await res.json()
            setBook(data)
        }
        fetchBook()
    }, [bookId])



    return (
        <>
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <WelcomeBanner />
                </div>
            </div>
        </div>
        <div className="container add-to-cart-main">
            <div className="add-to-cart-book-panel">
                <h1 className="add-to-cart-book-title">{book?.title ?? 'Loading…'}</h1>
                <p>Author: {book?.author}</p>
                <p>Publisher: {book?.publisher}</p>
                <p>ISBN: {book?.isbn}</p>
                <p>Classification: {book?.classification}</p>
                <p>Category: {book?.category}</p>
                <p>Page Count: {book?.pageCount}</p>
                <p className="add-to-cart-price">Price: ${book?.price != null ? Number(book.price).toFixed(2) : '—'}</p>
            </div>

            <div className="add-to-cart-actions">
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/')}>Continue Shopping</button>
                <button type="button" className="btn btn-outline-primary" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
        </>
    )
}
export default AddToCartPage;