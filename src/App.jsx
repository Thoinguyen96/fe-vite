import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./pages/contact/Contact";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import DefaultLayout from "./layout/defaultLayout/DefaultLayout";
import NotFound from "./pages/notFound/NotFound";
import { callCountUser } from "./services/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./pages/loading/Loading";
import { doFetchUser } from "./redux/account/userSlice";
import Admin from "./pages/admin/Admin";
import Authorization from "./layout/drumLayout/Authorization";
import LayoutAdmin from "./layout/layoutAdmin/LayoutAdmin";
export default function App() {
    const isAuthentication = useSelector((state) => state.account.authentically);
    const isLoading = useSelector((state) => state.account.isLoading);

    console.log(isAuthentication);
    const disPatch = useDispatch();
    useEffect(() => {
        callUserData();
    }, []);
    const callUserData = async () => {
        if (window.location.pathname === "/login" || window.location.pathname === "/register") {
            return;
        }
        const res = await callCountUser();
        if (res && res.data) {
            disPatch(doFetchUser(res.data));
        }
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <DefaultLayout />,
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "contact",
                    element: <Contact />,
                },
            ],
        },
        {
            path: "admin",
            element: <LayoutAdmin />,
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: (
                        <Authorization>
                            <Admin />
                        </Authorization>
                    ),
                },
            ],
        },
        {
            path: "register",
            element: <Register />,
            errorElement: <NotFound />,
        },
        {
            path: "login",
            element: <Login />,
            errorElement: <NotFound />,
        },
    ]);
    return (
        <>
            {isLoading === false ||
            window.location.pathname === "/login" ||
            window.location.pathname === "/register" ||
            window.location.pathname === "/" ? (
                <RouterProvider router={router} />
            ) : (
                <Loading />
            )}
        </>
    );
}
