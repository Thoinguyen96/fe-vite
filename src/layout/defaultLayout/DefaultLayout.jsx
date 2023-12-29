import { Outlet } from "react-router-dom";
import Header from "../../pages/header/Header";
import Footer from "../../pages/footer/Footer";
import { FloatButton } from "antd";
function DefaultLayout() {
    return (
        <div className="wrapper__home">
            <Header />
            <Outlet />
            <Footer />
            <FloatButton.BackTop tooltip={<div>Go top</div>} />
        </div>
    );
}

export default DefaultLayout;
