import React from "react";
import logo from "../../assets/images/logo1.png";
import { NavLink, Link } from "react-router-dom";
import "./header.css";
import { useSelector } from "react-redux";

const nav_links = [
    {
        display: "Home",
        path: "/home",
    },
    {
        display: "Products",
        path: "/products",
    },
];

const Header = () => {
    const cartItems = useSelector((state) => state.cart);
    return (
        <header className="header">
            <div className="nav__wrapper">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>

                {/* =========menu========== */}

                <div className="navigation">
                    <div className="menu">
                        {nav_links.map((item, index) => (
                            <NavLink
                                to={item.path}
                                key={index}
                                className={(navClass) =>
                                    navClass.isActive ? "active__menu" : ""
                                }
                            >
                                {item.display}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* ======== Nav Right icons */}

                <div className="nav__right">
                    <span className="cart__icon">
                        <Link to="/cart">
                            <i className="ri-shopping-basket-line"></i>
                            <span className="cart__batch">
                                {cartItems.length}
                            </span>
                        </Link>
                    </span>
                    <span className="user">
                        <Link to="/login">
                            <i className="ri-user-line"></i>
                        </Link>
                    </span>
                    <span className="mobile__menu">
                        <i className="ri-menu-line"></i>
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
