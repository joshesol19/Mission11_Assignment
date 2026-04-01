import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'

type SortOrder = 'asc' | 'desc'

interface ShopContextType {
  selectedCategories: string[]
  setSelectedCategories: Dispatch<SetStateAction<string[]>>

  pageNum: number
  setPageNum: Dispatch<SetStateAction<number>>

  pageSize: number
  setPageSize: Dispatch<SetStateAction<number>>

  sortOrder: SortOrder
  setSortOrder: Dispatch<SetStateAction<SortOrder>>
}

// this shop context holds filters and paging so the book pages can share that state
const ShopContext = createContext<ShopContextType | undefined>(undefined)

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  return (
    <ShopContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        pageNum,
        setPageNum,
        pageSize,
        setPageSize,
        sortOrder,
        setSortOrder,
      }}
    >
      {/* this provider wraps the app so children can pull the current shop settings easily */}
      {children}
    </ShopContext.Provider>
  )
}

export const useShop = () => {
  const ctx = useContext(ShopContext)
  if (!ctx) {
    throw new Error('useShop must be used within a ShopProvider')
  }
  return ctx
}

