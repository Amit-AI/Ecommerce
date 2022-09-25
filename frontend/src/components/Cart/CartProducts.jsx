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
                                src={product.images[0]}
                                alt="productImage"
                            />
                            <p className="cart__title" >{product.title}</p>
                            <p className="cart__price" >&#8377;{Math.round(product.price * 81.26)}</p>
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
