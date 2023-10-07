import { useDispatch } from "react-redux";
import { callLogout } from "../../services/ApiServices";
import { doLogoutUser } from "../../redux/account/userSlice";

function LogOut() {
    const disPatch = useDispatch();
    const handleLogout = async () => {
        await callLogout();
        disPatch(doLogoutUser());
    };
    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default LogOut;
