import { createSlice, current } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
    cart: [],
    value: 0,
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        doAddCart: (state, action) => {
            console(current(cart));
            let cart = state.cart;
            const item = action.payload;
            let isExitsIndex = cart.findIndex((c) => {
                return c._id === item._id;
            });
            if (isExitsIndex > -1) {
                cart[isExitsIndex].quantity = cart[isExitsIndex].quantity + item.quantity;
            } else {
                cart.push({ quantity: item.quantity, _id: item._id, detail: item.detail });
                message.success({
                    type: "success",
                    content: "Add cart success",
                });
            }
            state.cart = cart;
        },
    },

    extraReducers: () => {},
});
export const { doAddCart } = orderSlice.actions;
export default orderSlice.reducer;
