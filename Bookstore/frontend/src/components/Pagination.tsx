import { useShop } from "../context/ShopContext"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (newPage: number) => void 
    onPageSizeChange: (newPageSize: number) => void 
}

const Pagination = ({ currentPage, totalPages, onPageChange, onPageSizeChange }: PaginationProps) => {
    const { pageNum, setPageNum, pageSize, setPageSize, sortOrder, setSortOrder } = useShop()
    console.log("totalPages:", totalPages)
    
    return (
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
          onClick={() => {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
            setPageNum(1)
          }}
        >
          Sort by Title {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
    );
}

export default Pagination