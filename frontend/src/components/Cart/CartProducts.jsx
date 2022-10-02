import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";
import emptyCartImg from "../../assets/images/emptyCart.jpg";
import "./cart.css";

function CartProducts() {
    const cartItems = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const handleDelete = (productId) => {
        dispatch(removeFromCart(productId));
    };

    return (
        <>
            <h1 className="cart__heading">Cart</h1>
            {cartItems.length ? (
                <div className="cart__wrapper">
                    {cartItems.map((product, index) => (
                        <div key={index} className="cart__product">
                            <img
                                className="productImg"
                                src="https://img6.gadgetsnow.com/gd/images/products/additional/large/G390852_View_1/mobiles/smartphones/apple-iphone-14-pro-max-128-gb-deep-purple-6-gb-ram-.jpg"
                                alt="productImage"
                            />
                            <p className="cart__title" >{product.name}</p>
                            <p className="cart__price" >&#8377;{Math.round(product.price)}</p>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="cart__deleteBtn"
                            >
                                <i class="ri-close-line"></i>
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="cart__emptyWrapper">
                    <img className="cartImg" src={emptyCartImg} alt="" />
                </div>
            )}
        </>
    );
}

export default CartProducts;
