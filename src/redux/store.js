import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counter/counterSlice";
import accountReduce from "../redux/account/userSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        account: accountReduce,
    },
});
