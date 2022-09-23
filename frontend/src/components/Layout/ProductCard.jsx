import React from "react";
import "../../styles/products.css";


const ProductCard = (props) => {
    let {product} = props;
    
    return product && (
        <div className="card__container">
            <div className="card__image">
                <img
                    src={`${product.category.image}`}
                    alt=""
                />
            </div>
            <p>{product.title}</p>
            <p>{product.price}$</p>
            <p>{product.description}</p>
        </div>
    );
};

export default ProductCard;
