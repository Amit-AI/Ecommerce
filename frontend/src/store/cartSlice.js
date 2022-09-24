import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: { //used to change the state
        addToCart(state, action) {
            state.push(action.payload); //mutating state directly, only possible with redux toolkit, can't do this with vanilla Redux core library
        },
        removeFromCart(state, action) {
            let filter = true;
            return state.filter((item) => {
                
                if (filter && (item.id === action.payload)){
                    filter = false
                    return null;
                }
                else{
                    return item;
                }
            });
        },
    },
});


export const {addToCart, removeFromCart} = cartSlice.actions; //creates actions and reducers under the hood, unlike core Redux

export default cartSlice.reducer;