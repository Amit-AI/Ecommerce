import React from "react";
import { Link } from "react-router-dom";
import "./products.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const ProductCard = (props) => {
    let { product } = props;

    const dispatch = useDispatch();

    const handleAdd = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className="card__container">
            <Link to={`/product/${product.id}`}>
                <div className="card__image">
                    <img src={`${product.images[0]}`} alt="" />
                </div>
            </Link>
            <div className="card__desc">
                <Link to={`/product/${product.id}`}>
                    <p className="title">{product.title}</p>
                </Link>
                <p className="price">
                    &#8377;{Math.round(product.price * 81.26)}
                </p>
                {/* <p>{product.description}</p> */}
                <button
                    onClick={() => handleAdd(product)}
                    className="card__btn"
                >
                    Add to Cart
                </button>
            </div>
        </div>
        // product && (  added for issue where product array was null, API issue

        // )
    );
};

export default ProductCard;
