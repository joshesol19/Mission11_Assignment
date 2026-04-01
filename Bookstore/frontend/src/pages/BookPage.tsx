import { useShop } from '../context/ShopContext'
import WelcomeBanner from "../components/welcomeBanner";
import CategoryFilter from "../components/categoryFilter";
import BookList from "../components/BookList";
import CartSummary from "../components/CartSummary";

function BookPage() {
    const { selectedCategories, setSelectedCategories } = useShop()
    return (
        <>
        {/* this page wires together the filter, list, and summary for the main shopping view */}
        <CartSummary />
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
