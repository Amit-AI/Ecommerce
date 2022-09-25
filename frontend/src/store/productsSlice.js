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

export function fetchProducts() {
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            dispatch(setProducts(data));
            dispatch(setStatus(STATUS.SUCCESS))
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
