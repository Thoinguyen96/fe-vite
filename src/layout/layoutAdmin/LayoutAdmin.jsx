import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../pages/headerAdmin/HeaderAdmin";

function LayoutAdmin(props) {
    return (
        <div>
            <HeaderAdmin />
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default LayoutAdmin;
