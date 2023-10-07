import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function Authorization({ children }) {
    const isAuthentication = useSelector((state) => state.account.authentically);
    console.log(isAuthentication);
    if (isAuthentication === true) {
        return <div>{children}</div>;
    } else {
        return <Navigate to={"/login"} />;
    }
}

export default Authorization;
