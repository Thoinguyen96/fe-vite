import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authentically: false,
    user: {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
    },
};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        doAccountLogin: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.authentically = true;
        },
        doFetchUser: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.authentically = true;
        },
        doLogoutUser: (state, action) => {
            localStorage.removeItem("access_token");
            state.isLoading = false;
            state.user = {
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: "",
            };
            state.authentically = false;
        },
    },

    extraReducers: (builder) => {},
});

export const { doAccountLogin, doFetchUser, doLogoutUser } = accountSlice.actions;

export default accountSlice.reducer;
