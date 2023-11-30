import { createSlice, current } from "@reduxjs/toolkit";

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
        doUpdateUser: (state, action) => {
            localStorage.removeItem("access_token");

            if (state.user.id === action.payload.id) {
                state.user.avatar = action.payload.avatar;
                state.user.phone = action.payload.phone;
                state.user.fullName = action.payload.fullName;
                state.isLoading = false;
                state.authentically = true;
            }
        },
    },

    extraReducers: (builder) => {},
});

export const { doAccountLogin, doFetchUser, doLogoutUser, doUpdateUser } = accountSlice.actions;

export default accountSlice.reducer;
