import React from "react";
import ProductCard from "./ProductCard";
import "./products.css";
import { useState, useEffect } from "react";

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    
    const fetchData = async () => {
        const res = await fetch("https://fakestoreapi.com/products")
        const data = await res.json();
        setProducts(data);
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
        </div>
    );
};

export default ProductGrid;
