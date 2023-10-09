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
            <div onClick={handleLogout}>Log out</div>
        </>
    );
}

export default LogOut;
