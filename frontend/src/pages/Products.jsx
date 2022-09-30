import React from "react";
import { ProductGrid } from "../components/componentsExport";
import "../components/Products/products.css";

const Products = () => {
    return (
        <div>
            <h1 className="products__heading">All Products</h1>
            <div className="productSearch">
                <input type="text" placeholder="search a product..." spellCheck="false"/>
            </div>
            <ProductGrid />
        </div>
    );
};

export default Products;
