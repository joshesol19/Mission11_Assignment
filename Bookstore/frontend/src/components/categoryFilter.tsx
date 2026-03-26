import { useEffect, useState } from "react";
import './categoryFilter.css';

const API =
  import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7263'


function CategoryFilter({onCheckboxChange, selectedCategories}: {onCheckboxChange: (categories: string[])=>void, selectedCategories: string[]}) {
    const [categories, setCategories] = useState<string[]>([]);
    useEffect(() => {
        try {
            async function fetchCategories() {
                const resp = await fetch(`${API}/api/Books/categories`);
                const data = await resp.json();
                setCategories(data);
            }
            fetchCategories();
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);


    function handleCategoryChange({target}: {target: HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter((x) => x !== target.value) : [...selectedCategories, target.value];
        onCheckboxChange(updatedCategories);
    }


    return (
        <div className="category-filter mb-3">
            <h5 className="category-filter-title">Categories</h5>
            {categories.map((c) => (
                <div key={c}>
                    <input type="checkbox" 
                    id={c} value={c} 
                    className="category-filter-checkbox" 
                    checked={selectedCategories.includes(c)}
                    onChange={handleCategoryChange} />

                    <label htmlFor={c} className="category-filter-label">{c}</label>
                </div>
            ))}
        </div>
    );
}

export default CategoryFilter;