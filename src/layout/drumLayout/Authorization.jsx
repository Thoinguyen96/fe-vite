import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Authorization({ children }) {
    const isAuthentication = useSelector((state) => state.account.authentically);
    if (isAuthentication === true) {
        return <div>{children}</div>;
    } else {
        return <Login />;
    }
}

export default Authorization;
