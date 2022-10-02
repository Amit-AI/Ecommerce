import React, { useState } from "react";
import { ProductGrid } from "../components/componentsExport";
import "../components/Products/products.css";
import { debounce } from "lodash";

const Products = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
    });

    const handleSearch = debounce((e) => {
        setFormData(() => ({
            ...formData,
            [e.target.name]: e.target.value,
        }));
    }, 300);
    return (
        <div>
            <h1 className="products__heading">All Products</h1>
            <div className="productSearch">
                <input
                    type="text"
                    name="name"
                    placeholder="search a product..."
                    spellCheck="false"
                    onChange={handleSearch}
                />
            </div>
            <div className="categories__wrapper">
                <div className="categories">
                    <label className="category__label">
                        All
                        <input
                            type="radio"
                            className="category__item"
                            name="category"
                            value=""
                            onChange={handleSearch}
                        />
                    </label>
                    <label className="category__label">
                        Electronics
                        <input
                            type="radio"
                            className="category__item"
                            name="category"
                            value="Electronics"
                            onChange={handleSearch}
                        />
                    </label>
                    <label className="category__label">
                        Cellphone
                        <input
                            type="radio"
                            className="category__item"
                            name="category"
                            value="Cellphone"
                            onChange={handleSearch}
                        />
                    </label>
                    <label className="category__label">
                        Laptop
                        <input
                            type="radio"
                            className="category__item"
                            name="category"
                            value="Laptop"
                            onChange={handleSearch}
                        />
                    </label>
                    <label className="category__label">
                        Toys
                        <input
                            type="radio"
                            className="category__item"
                            name="category"
                            value="Toys"
                            onChange={handleSearch}
                        />
                    </label>
                </div>
            </div>
            <ProductGrid filters={formData} />
        </div>
    );
};

export default Products;
