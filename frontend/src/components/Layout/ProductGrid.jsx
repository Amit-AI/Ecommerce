import React from "react";
import ProductCard from "./ProductCard";
import "../../styles/products.css";
import { useState, useEffect } from "react";

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    // Platzi Fake Store API
    const fetchData = () => {
        fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=10")
        .then(response => {
            return response.json()
        })
        .then(data => {
            setProducts(data);
        })
    }
    
    useEffect(()=>{
        fetchData();
    },[])


    // console.log(products);
    return (
        <div className="products__container">
            {products.length>0 &&  products.map((item)=>{
                // console.log(item.title)
                return (<ProductCard key = {item.id} product={item}/>)
            })}

            <ProductCard />
            <ProductCard />
        </div>
    );
};

export default ProductGrid;
