import { createSlice } from "@reduxjs/toolkit";

export const STATUS = Object.freeze({
    SUCCESS: "success",
    LOADING: "loading",
    ERROR: "error",
});

const productSlice = createSlice({
    name: "products",
    initialState: {
        data: [],
        status: STATUS.SUCCESS,
    },
    reducers: {
        setStatus(state, action) {
            state.status = action.payload;
        },
        setProducts(state, action) {
            state.data = action.payload;
        },
    },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;
// Redux THUNKS -- used for creating async reducers

export function fetchProducts(filters) {
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            // const res = await fetch("https://api.escuelajs.co/api/v1/products");
            const { name, category } = filters;
            let url = "http://localhost:5000/api/products";
            if (name || category) {
                url += "?";

                if (name) {
                    url += `name=${name}&`;
                }

                if (category) {
                    url += `category=${category}`;
                }
            }
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data.products);
            dispatch(setProducts(data.products));
            dispatch(setStatus(STATUS.SUCCESS));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
