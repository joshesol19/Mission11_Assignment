import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API =
  import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7263'

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



function BookList({ selectedCategories }: {selectedCategories: string[]}) {
  const [books, setBooks] = useState<Book[]>([])
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [sortOrder, setSortOrder] = useState('asc')
  const [totalCount, setTotalCount] = useState(0)
  const navigate = useNavigate()
  const totalPages = Math.ceil(totalCount / pageSize)

  useEffect(() => {
    async function fetchBooks() {
      const params = new URLSearchParams()
      params.set('pageNum', String(pageNum))
      params.set('pageSize', String(pageSize))
      params.set('sortOrder', sortOrder)
      for (const c of selectedCategories) {
        params.append('categories', c)
      }
      const res = await fetch(`${API}/api/Books?${params.toString()}`)
      const data = await res.json()
      setBooks(data.books ?? [])
      setTotalCount(data.totalCount ?? 0)
    }

    fetchBooks()
  }, [pageNum, pageSize, sortOrder, selectedCategories])

  
  return (
    <div className="py-3">
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

      <div className="d-flex flex-wrap gap-2 align-items-center mt-3">
        <label className="d-flex align-items-center gap-2 mb-0">
          <span className="text-nowrap small">Per page</span>
          <select
            className="form-select form-select-sm"
            style={{ width: 'auto' }}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setPageNum(1)
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>

        <button
          type="button"
          className="btn btn-secondary"
          disabled={pageNum === 1}
          onClick={() => setPageNum((p) => p - 1)}
        >
          Previous
        </button>

        {Array(totalPages)
          .fill(null)
          .map((_, index) => {
            const n = index + 1
            const isCurrent = pageNum === n
            return (
              <button
                key={n}
                type="button"
                className={`btn ${isCurrent ? 'btn-primary' : 'btn-outline-primary'}`}
                disabled={isCurrent}
                onClick={() => setPageNum(n)}
              >
                {n}
              </button>
            )
          })}

        <button
          type="button"
          className="btn btn-secondary"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum((p) => p + 1)}
        >
          Next
        </button>

        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort by Title {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
    </div>
  )
}

export default BookList
