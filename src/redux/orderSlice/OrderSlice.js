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
        doUpdateCart: (state, action) => {
            let cart = state.cart;
            const item = action.payload;
            console.log(item);

            let isExitsIndex = cart.findIndex((c) => {
                return c._id === item._id;
            });

            if (isExitsIndex > -1) {
                if (item.uQuantity > 1) {
                    cart[isExitsIndex].quantity = item.uQuantity;
                }
            } else {
                cart.push({ quantity: item.quantity, _id: item._id, detail: item.detail });
                message.success({
                    type: "success",
                    content: "Add cart success",
                });
            }
            state.cart = cart;
        },

        doDeleteProduct: (state, action) => {
            let cart = state.cart;
            const item = action.payload;
            console.log(item);
            if (cart.length > 0) {
                cart = cart.filter((a) => {
                    return a._id !== item;
                });
                state.cart = cart;
            }
        },
    },

    extraReducers: () => {},
});
export const { doAddCart, doUpdateCart, doDeleteProduct } = orderSlice.actions;
export default orderSlice.reducer;
