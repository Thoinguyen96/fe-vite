import React, { useState } from "react";
import styles from "./styles/Counter.module.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import DefaultLayout from "./layout/DefaultLayout";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <DefaultLayout />,
            errorElement: <div>not found 404</div>,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "contact",
                    element: <Contact />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}
