import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../pages/headerAdmin/HeaderAdmin";
import Navbar from "../../pages/navbar/Navbar";
import { useState } from "react";
import Footer from "../../pages/footer/Footer";
import { useSelector } from "react-redux";
// import Login from "../../pages/login/Login";

function LayoutAdmin() {
    const [collapsed, setCollapsed] = useState(false);
    // const roleUser = useSelector((state) => state.account.user["role"]);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    // if (roleUser === "ADMIN") {
    return (
        <div className="wrap__LayoutAdmin">
            <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

            <div className="wrap__admin-content">
                <HeaderAdmin toggleCollapsed={toggleCollapsed} />
                <Outlet />
                <Footer />
            </div>
        </div>
    );
    // } else {
    //     return <Login />;
    // }
}

export default LayoutAdmin;
