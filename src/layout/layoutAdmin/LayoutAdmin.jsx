import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../pages/headerAdmin/HeaderAdmin";
import Navbar from "../../pages/navbar/Navbar";
import { useState } from "react";
import Footer from "../../pages/footer/Footer";
import { useSelector } from "react-redux";
import MenuBottom from "../../pages/headerAdmin/menuBottom/MenuBottom";
import { FloatButton } from "antd";
function LayoutAdmin() {
    const [collapsed, setCollapsed] = useState(false);
    // const roleUser = useSelector((state) => state.account.user["role"]);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    // if (roleUser === "ADMIN") {
    return (
        <div className="wrap__LayoutAdmin">
            <div className="hide-on-mobile-tablet-d">
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>

            <div className="wrap__admin-content">
                <HeaderAdmin toggleCollapsed={toggleCollapsed} />
                <Outlet />
                <Footer />
                <div className="menu__bottom hide-on-pc-d">
                    <MenuBottom />
                </div>
                <FloatButton.BackTop />
            </div>
        </div>
    );
    // } else {
    //     return <Login />;
    // }
}

export default LayoutAdmin;
