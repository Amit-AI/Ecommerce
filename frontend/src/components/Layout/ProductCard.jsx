import React from "react";
import "../../styles/products.css";

const ProductCard = (props) => {
    console.log(props.product)
    return (
        <div className="card__container">
            <div className="card__image">
                <img
                    src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                    alt=""
                />
            </div>
            <p>title</p>
            <p>109.95$</p>
            <p>3.9</p>
        </div>
    );
};

export default ProductCard;
