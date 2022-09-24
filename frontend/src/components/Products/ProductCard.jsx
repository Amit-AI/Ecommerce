import React from "react";
import { NavLink } from "react-router-dom";
import "./products.css";
import {useDispatch } from "react-redux";
import { addToCart} from "../../store/cartSlice";

const ProductCard = (props) => {
    let { product } = props;

    const dispatch = useDispatch();

    const handleAdd = (product) => {
        dispatch(addToCart(product));
    };

    return (
        product && (
            <div className="card__container">
                <NavLink to="/productdetails">
                    <div className="card__image">
                        <img src={`${product.image}`} alt="" />
                    </div>
                </NavLink>
                <div className="card__desc">
                    <p>{product.title}</p>
                    <p>{product.price}$</p>
                    {/* <p>{product.description}</p> */}
                    <button
                        onClick={() => handleAdd(product)}
                        className="card__btn"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        )
    );
};

export default ProductCard;
