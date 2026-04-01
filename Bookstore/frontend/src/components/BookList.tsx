import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { fetchBooks } from '../api/ProjectsAPI'
import Pagination from './Pagination'

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



// this component shows the main list of books so the user can browse everything
function BookList({ selectedCategories }: {selectedCategories: string[]}) {
  const [books, setBooks] = useState<Book[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { pageNum, setPageNum, pageSize, setPageSize, sortOrder, setSortOrder } = useShop()
  const totalPages = Math.ceil(totalCount / pageSize)
  const didMountRef = useRef(false)

  // Reset to page 1 after a category selection change, but do not reset on initial mount
  // so "Continue Shopping" can restore the exact page the user was on.
  useEffect(() => {
    // this effect is just watching for category chnages and bumps the page back to one
    if (didMountRef.current) {
      setPageNum(1)
      return
    }
    didMountRef.current = true
  }, [selectedCategories, setPageNum])

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true); 
        const data = await fetchBooks(pageNum, pageSize, sortOrder, selectedCategories);
        // here we pull the books and total count from the api so paging can work
        setBooks(data.books as unknown as Book[])
        setTotalCount(data.totalCount ?? 0)
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [pageNum, pageSize, sortOrder, selectedCategories])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }

  
  return (
    <div className="py-3">
      {/* #notcoveredinthevideos: Uses Bootstrap `g-3` gutter utility to space grid columns without custom CSS. */}
      <div className="row g-3">
        {books.map((b) => (
          <div className="col-md-6 col-lg-4" key={b.bookID}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{b.title}</h5>
                <p className="small mb-1">
                  <strong>Author:</strong> {b.author}
                </p>
                <p className="small mb-1">
                  <strong>Publisher:</strong> {b.publisher}
                </p>
                <p className="small mb-1">
                  <strong>ISBN:</strong> {b.isbn}
                </p>
                <p className="small mb-1">
                  <strong>Classification:</strong> {b.classification}
                </p>
                <p className="small mb-1">
                  <strong>Category:</strong> {b.category}
                </p>
                <p className="small mb-1">
                  <strong>Pages:</strong> {b.pageCount}
                </p>
                <p className="small mb-0">
                  <strong>Price:</strong> ${b.price.toFixed(2)}
                </p>
                <br />
                <button className="btn btn-primary" onClick={() => navigate(`/add-to-cart/${b.bookID}`)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination currentPage={pageNum} totalPages={totalPages} onPageChange={setPageNum} onPageSizeChange={setPageSize} />
    </div>
  )
}

export default BookList
