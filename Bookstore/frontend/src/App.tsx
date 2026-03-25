import { useState } from 'react'
import CategoryFilter from './categoryFilter.tsx'
import BookList from './BookList.tsx'
import WelcomeBanner from './welcomeBanner.tsx'

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  return (
    <>
      <div className="container mt-4">
        <div className="row bg-primary text-white">
          <div className="col-12">
            <WelcomeBanner />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              onCheckboxChange={setSelectedCategories}
            />
          </div>
          <div className="col-md-9">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
