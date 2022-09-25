import React from "react";
import ProductCard from "./ProductCard";
import "./products.css";
import { useEffect } from "react";
import { STATUS, fetchProducts } from "../../store/productsSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductGrid = () => {
    const dispatch = useDispatch();

    const { data: products, status } = useSelector((state) => state.products); //renamed data property to prop

    //COMMENT: using Redux toolkit instead of usestate
    // const [products, setProducts] = useState([]);

    // const fetchData = async () => {
    //     const res = await fetch("https://fakestoreapi.com/products")
    //     const data = await res.json();
    //     setProducts(data);
    // }

    useEffect(() => {
        dispatch(fetchProducts());
        // fetchData();
    }, []);

    if (status === STATUS.LOADING) {
        return (
            <div className="loading__wrapper">
                <div class="lds-dual-ring"></div>
            </div>
        );
    }

    // console.log(products);
    return (
        <div className="products__container">
            {products.length > 0 &&
                products.map((item) => {
                    // console.log(item.title)
                    return <ProductCard key={item.id} product={item} />;
                })}
        </div>
    );
};

export default ProductGrid;
