import React from "react";
import ProductCard from "./ProductCard";
import "../../styles/products.css";
import { useEffect } from "react";

const ProductGrid = () => {
    let products = [];
    
    useEffect(()=>{
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((json) => {
                json.forEach((item) => {
                    products.push(item);
                });
            });
    },[])


    console.log(products);
    return (
        <div className="products__container">
            {products.length? 
            products.map((item) => {
                return (<ProductCard product={item} key={item.id} />)
            }) : "Nothing to Display"};

            <ProductCard />
            <ProductCard />
        </div>
    );
};

export default ProductGrid;
