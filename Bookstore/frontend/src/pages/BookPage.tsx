import { useState } from "react";
import WelcomeBanner from "../components/welcomeBanner";
import CategoryFilter from "../components/categoryFilter";
import BookList from "../components/BookList";

function BookPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    return (
        <>
        <div className="container mt-4">
        <div className="row">
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
export default BookPage;
