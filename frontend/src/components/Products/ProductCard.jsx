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
    // {`${product.images[0]}`} 

    // console.log(product.images[0]? product.images[0].url: "NOT AVAILABLE")
    return (
        <div className="card__container">
            <Link to={`/product/${product._id}`}>
                <div className="card__image">
                    <img src={`${product.images[0]? product.images[0].url: "NOT AVAILABLE"}`} alt="" /> 
                </div>
            </Link>
            <div className="card__desc">
                <Link to={`/product/${product._id}`}>
                    <p className="title">{product.name}</p>
                </Link>
                <p className="price">
                    &#8377;{Math.round(product.price)}
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
        
    );
};

export default ProductCard;
