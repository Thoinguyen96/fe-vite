import { Outlet } from "react-router-dom";
import Header from "../../pages/header/Header";
import Footer from "../../pages/footer/Footer";

function DefaultLayout() {
    return (
        <div className="wrapper__home">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default DefaultLayout;
