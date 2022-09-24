import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { removeFromCart } from "../../store/cartSlice";
import "./cart.css";

function CartProducts() {
    const cartItems = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const handleDelete = (productId) => {
        dispatch(removeFromCart(productId));
    };

    return (
        <>
            <h1>Cart</h1>
            <div className="cart__wrapper">
                {cartItems.map((product, index) => (
                    <div key={index} className="cart__product">
                        <p>{product.title}</p>
                        <p>{product.price}</p>
                        <div
                            onClick={() => handleDelete(product.id)}
                            className="cart__deleteBtn"
                        >
                            <button>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CartProducts;
