import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../redux/counter/counterSlice";
import accountReduce from "../redux/account/userSlice";
import orderReduce from "../redux/orderSlice/OrderSlice";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    counter: counterReducer,
    account: accountReduce,
    order: orderReduce,
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: ["account"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);
export { persistor, store };
