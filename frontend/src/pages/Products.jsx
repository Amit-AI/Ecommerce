import React from "react";
import ProductGrid from "../components/Layout/ProductGrid";
import "../styles/products.css";


const Products = () => {
    return (
        <div>
            <h1 className="products__heading">All Products</h1>
            <ProductGrid />
        </div>
    );
};

export default Products;
